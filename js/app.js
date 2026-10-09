/**
 * DIGITÁLIS LELKIISMERET - Application Logic & UI State Machine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configured Apps Script URL (place real endpoint here when available)
  const GOOGLE_APPS_SCRIPT_URL = '';

  // Prevent multiple rapid clicks from registering multiple decisions
  let isProcessingChoice = false;

  // App State Object
  let state = {
    version: window.CURRENT_VERSION || '1.0.0',
    sessionId: '',
    currentState: 'START',
    currentScenarioIndex: 0,
    selectedChoiceLetter: null, // Stores the original choice key ('A', 'B', 'C', or 'D')
    decisions: {},
    choiceOrders: {}, // scenarioId -> array of originalChoiceKeys e.g. ['C', 'A', 'D', 'B']
    reflections: {
      q1: '',
      q2: '',
      q3: ''
    },
    submissionStatus: {
      submitted: false,
      timestamp: null,
      error: null
    }
  };

  // DOM Elements
  const elements = {
    screens: {
      start: document.getElementById('screen-start'),
      scenario: document.getElementById('screen-scenario'),
      consequence: document.getElementById('screen-consequence'),
      summary: document.getElementById('screen-summary')
    },
    sessionBadge: document.getElementById('session-badge'),
    btnStart: document.getElementById('btn-start'),

    // Scenario screen
    scenarioStepIndicator: document.getElementById('scenario-step-indicator'),
    scenarioThemeBadge: document.getElementById('scenario-theme-badge'),
    progressBarFill: document.getElementById('progress-bar-fill'),
    scenarioVisualContainer: document.getElementById('scenario-visual-container'),
    scenarioTitle: document.getElementById('scenario-title'),
    scenarioQuestionText: document.getElementById('scenario-question-text'),
    choicesGrid: document.getElementById('choices-grid'),

    // Consequence screen
    consequenceStepIndicator: document.getElementById('consequence-step-indicator'),
    consequenceChoiceBadge: document.getElementById('consequence-choice-badge'),
    consequenceProgressBarFill: document.getElementById('consequence-progress-bar-fill'),
    consequenceTitle: document.getElementById('consequence-title'),
    selectedChoiceDisplay: document.getElementById('selected-choice-display'),
    consequenceImmediateText: document.getElementById('consequence-immediate-text'),
    consequenceLongtermText: document.getElementById('consequence-longterm-text'),
    consequenceEthicsText: document.getElementById('consequence-ethics-text'),
    consequenceBiblicalContainer: document.getElementById('consequence-biblical-container'),
    consequenceThinkText: document.getElementById('consequence-think-text'),
    btnNextScenario: document.getElementById('btn-next-scenario'),
    btnNextScenarioText: document.getElementById('btn-next-scenario-text'),

    // Summary screen
    summaryTitle: document.getElementById('summary-title'),
    summaryTableBody: document.getElementById('summary-table-body'),
    refQ1: document.getElementById('ref-q1'),
    refQ2: document.getElementById('ref-q2'),
    refQ3: document.getElementById('ref-q3'),
    summarySessionId: document.getElementById('summary-session-id'),
    submissionNotice: document.getElementById('submission-notice'),
    btnSubmitTeacher: document.getElementById('btn-submit-teacher'),
    btnExportJson: document.getElementById('btn-export-json'),
    btnCopyJson: document.getElementById('btn-copy-json'),
    btnRestartGame: document.getElementById('btn-restart-game'),

    // Image Lightbox Modal
    imageModal: document.getElementById('image-modal'),
    lightboxImg: document.getElementById('lightbox-img'),
    lightboxClose: document.getElementById('lightbox-close')
  };

  // --- INIT APPLICATION ---
  function init() {
    const loaded = window.StorageHandler.load(window.SCENARIOS);
    state = loaded.state;

    if (loaded.versionMismatch) {
      alert(loaded.message);
    }

    elements.sessionBadge.textContent = state.sessionId;
    elements.sessionBadge.style.display = 'inline-block';

    attachEventListeners();
    restoreUIState();
  }

  // --- STATE PERSISTENCE HELPERS ---
  function saveState() {
    window.StorageHandler.save(state);
  }

  function setAppState(newState) {
    state.currentState = newState;
    saveState();
    renderState();
  }

  // --- ROUTING / STATE MACHINE RENDER ---
  function renderState() {
    // Hide all screens
    Object.values(elements.screens).forEach(screen => {
      screen.classList.remove('active');
    });

    switch (state.currentState) {
      case 'START':
        elements.screens.start.classList.add('active');
        break;

      case 'SCENARIO':
      case 'CONFIRM':
        // Guard: If this scenario already has a confirmed decision, jump to CONSEQUENCE
        const currentSc = window.SCENARIOS[state.currentScenarioIndex];
        if (currentSc && state.decisions[currentSc.id]) {
          state.currentState = 'CONSEQUENCE';
          saveState();
          elements.screens.consequence.classList.add('active');
          renderConsequenceScreen();
        } else {
          elements.screens.scenario.classList.add('active');
          renderScenarioScreen();
        }
        break;

      case 'CONSEQUENCE':
        elements.screens.consequence.classList.add('active');
        renderConsequenceScreen();
        break;

      case 'SUMMARY':
      case 'REFLECTION':
      case 'SUBMISSION':
        elements.screens.summary.classList.add('active');
        renderSummaryScreen();
        break;

      default:
        elements.screens.start.classList.add('active');
    }

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function restoreUIState() {
    renderState();
  }

  // --- SCENARIO SCREEN RENDER ---
  function renderScenarioScreen() {
    isProcessingChoice = false;
    const scenarioIndex = state.currentScenarioIndex;
    const sc = window.SCENARIOS[scenarioIndex];

    if (!sc) {
      setAppState('SUMMARY');
      return;
    }

    // Progress bar
    const stepNum = scenarioIndex + 1;
    elements.scenarioStepIndicator.textContent = `${stepNum} / ${window.SCENARIOS.length} Helyzet`;
    elements.scenarioThemeBadge.textContent = sc.theme;
    elements.progressBarFill.style.width = `${(stepNum / window.SCENARIOS.length) * 100}%`;

    // Titles
    elements.scenarioTitle.textContent = sc.title;
    elements.scenarioQuestionText.textContent = sc.question;

    // Custom Visual Context Mockup
    renderVisualMockup(sc);

    // Choices Grid
    elements.choicesGrid.innerHTML = '';

    const displaySlots = ['A', 'B', 'C', 'D'];
    const shuffledKeys = (state.choiceOrders && state.choiceOrders[sc.id]) ? state.choiceOrders[sc.id] : ['A', 'B', 'C', 'D'];

    shuffledKeys.forEach((originalKey, slotIndex) => {
      const slotLetter = displaySlots[slotIndex];
      const choice = sc.choices[originalKey];

      const card = document.createElement('div');
      card.className = 'choice-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.dataset.letter = slotLetter;
      card.dataset.originalKey = originalKey;

      card.innerHTML = `
        <div class="choice-letter-badge">${slotLetter}</div>
        <div class="choice-text">${choice.label}</div>
      `;

      card.addEventListener('click', () => makeDirectDecision(originalKey));
      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          makeDirectDecision(originalKey);
        }
      });

      elements.choicesGrid.appendChild(card);
    });
  }

  // --- DIRECT DECISION HANDLER (Instant Lock & Navigate to Consequence) ---
  function makeDirectDecision(originalKey) {
    if (isProcessingChoice) return;
    isProcessingChoice = true;

    const scenarioIndex = state.currentScenarioIndex;
    const sc = window.SCENARIOS[scenarioIndex];

    if (!sc) return;

    // Guard: Prevent overwriting existing decisions
    if (state.decisions[sc.id]) {
      setAppState('CONSEQUENCE');
      return;
    }

    state.selectedChoiceLetter = originalKey;
    state.decisions[sc.id] = originalKey;
    saveState();

    setAppState('CONSEQUENCE');
  }

  // --- LIGHTBOX ZOOM MODAL HANDLERS ---
  function openLightbox(src, alt) {
    if (!elements.imageModal) return;
    elements.lightboxImg.src = src;
    elements.lightboxImg.alt = alt || 'Nagyított kép';
    elements.imageModal.classList.add('active');
    elements.imageModal.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!elements.imageModal) return;
    elements.imageModal.classList.remove('active');
    elements.imageModal.setAttribute('aria-hidden', 'true');
    elements.lightboxImg.src = '';
  }

  // --- VISUAL CONTEXT MOCKUPS FOR EACH SCENARIO ---
  function renderVisualMockup(sc) {
    const container = elements.scenarioVisualContainer;
    container.innerHTML = '';

    const formattedStory = sc.story.replace(/\n\n/g, '</p><p class="mockup-story-p">');
    let innerHTML = '';

    switch (sc.visualType) {
      case 'chat_group':
        innerHTML = `
          <div class="mockup-header messenger-header">
            <div class="mockup-title-area">
              <div class="mockup-icon group-avatar">👥</div>
              <div>
                <div class="mockup-name">${sc.groupName || 'XII. B – Osztálycsoport'}</div>
                <div class="mockup-sub">${sc.memberCount || '24 tag'}</div>
              </div>
            </div>
          </div>
          <div class="chat-window messenger-window">
            ${sc.chatMessages ? sc.chatMessages.map(msg => `
              <div class="chat-row ${msg.isKey ? 'key-row' : ''}">
                <div class="user-avatar" style="background-color: ${msg.color || '#2196F3'}">${msg.avatar || msg.sender.charAt(0)}</div>
                <div class="chat-bubble-container">
                  <div class="chat-bubble ${msg.isKey ? 'key-message' : ''}">
                    <div class="chat-sender" style="color: ${msg.color || '#2196F3'}">
                      ${msg.sender} <span class="time">${msg.time}</span>
                    </div>
                    ${msg.text ? `<div class="chat-text">${msg.text}</div>` : ''}
                    ${msg.image ? `
                      <div class="chat-image-container">
                        <img src="${msg.image}" alt="Kínos fotó Mátéról" class="chat-attached-img" />
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>
            `).join('') : ''}
          </div>
        `;
        break;

      case 'image_scene':
        innerHTML = `
          <p class="mockup-story-p">${formattedStory}</p>
          ${sc.image ? `
            <div class="scene-image-wrapper">
              <img src="${sc.image}" alt="${sc.title}" class="scene-attached-img zoomable-img" title="Kattints a nagyításhoz" />
              <div class="zoom-hint">🔍 Kattints a képre a nagyításhoz</div>
            </div>
          ` : ''}
        `;
        break;

      default:
        innerHTML = `<p class="mockup-story-p">${formattedStory}</p>`;
    }

    container.innerHTML = innerHTML;

    // Attach click listeners to zoomable images inside the mockup
    const zoomableImgs = container.querySelectorAll('.zoomable-img, .chat-attached-img');
    zoomableImgs.forEach(img => {
      img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });
  }

  // --- CONSEQUENCE SCREEN RENDER ---
  function renderConsequenceScreen() {
    const scenarioIndex = state.currentScenarioIndex;
    const sc = window.SCENARIOS[scenarioIndex];
    const originalKey = state.decisions[sc.id];
    const choice = sc.choices[originalKey];

    // Find display slot letter
    const displaySlots = ['A', 'B', 'C', 'D'];
    const shuffledKeys = (state.choiceOrders && state.choiceOrders[sc.id]) ? state.choiceOrders[sc.id] : displaySlots;
    const slotIndex = shuffledKeys.indexOf(originalKey);
    const slotLetter = slotIndex !== -1 ? displaySlots[slotIndex] : originalKey;

    const stepNum = scenarioIndex + 1;
    elements.consequenceStepIndicator.textContent = `${stepNum} / ${window.SCENARIOS.length} Helyzet`;
    elements.consequenceChoiceBadge.textContent = `Kiválasztott döntés: ${slotLetter}`;
    elements.consequenceProgressBarFill.style.width = `${(stepNum / window.SCENARIOS.length) * 100}%`;

    elements.consequenceTitle.textContent = sc.title;
    elements.selectedChoiceDisplay.textContent = `${slotLetter} – ${choice.label}`;

    elements.consequenceImmediateText.textContent = choice.immediate;
    elements.consequenceLongtermText.textContent = choice.longTerm;
    elements.consequenceEthicsText.textContent = choice.ethics;

    // Render Scripture Reference, Quote, and Teaching
    const igehely = choice.igehely || '';
    const bibliaiIdezet = choice.bibliaiIdezet || '';
    const tanitas = choice.tanitas || choice.bibliaiGuidance || '';

    elements.consequenceBiblicalContainer.innerHTML = `
      <div class="biblical-reference"><strong>IGEHELY:</strong> ${igehely}</div>
      <div class="biblical-quote"><strong>BIBLIAI IDÉZET:</strong> „${bibliaiIdezet}”</div>
      <div class="biblical-teaching"><strong>TANÍTÁS:</strong> ${tanitas}</div>
    `;

    elements.consequenceThinkText.textContent = choice.question;

    if (scenarioIndex === window.SCENARIOS.length - 1) {
      elements.btnNextScenarioText.textContent = 'Eredményeim megtekintése';
    } else {
      elements.btnNextScenarioText.textContent = 'Következő történet';
    }
  }

  function handleNextScenario() {
    // Find next unanswered scenario index
    let nextUnanswered = -1;
    for (let i = 0; i < window.SCENARIOS.length; i++) {
      if (!state.decisions[window.SCENARIOS[i].id]) {
        nextUnanswered = i;
        break;
      }
    }

    if (nextUnanswered !== -1) {
      state.currentScenarioIndex = nextUnanswered;
      state.selectedChoiceLetter = null;
      setAppState('SCENARIO');
    } else {
      setAppState('SUMMARY');
    }
  }

  // --- SUMMARY & REFLECTION SCREEN RENDER ---
  function renderSummaryScreen() {
    elements.summarySessionId.textContent = state.sessionId;

    // Populate Table
    elements.summaryTableBody.innerHTML = '';
    const displaySlots = ['A', 'B', 'C', 'D'];

    window.SCENARIOS.forEach((sc, idx) => {
      const originalKey = state.decisions[sc.id];
      const choiceObj = sc.choices[originalKey];

      let slotLetter = '-';
      if (originalKey) {
        const shuffledKeys = (state.choiceOrders && state.choiceOrders[sc.id]) ? state.choiceOrders[sc.id] : displaySlots;
        const slotIndex = shuffledKeys.indexOf(originalKey);
        slotLetter = slotIndex !== -1 ? displaySlots[slotIndex] : originalKey;
      }

      const titleShort = choiceObj ? choiceObj.shortTitle || choiceObj.label : 'Nincs döntés';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${idx + 1}.</strong></td>
        <td>${sc.title}</td>
        <td><span class="choice-pill">${slotLetter}</span></td>
        <td>${titleShort}</td>
      `;
      elements.summaryTableBody.appendChild(tr);
    });

    // Populate Reflections
    elements.refQ1.value = state.reflections.q1 || '';
    elements.refQ2.value = state.reflections.q2 || '';
    elements.refQ3.value = state.reflections.q3 || '';

    updateSubmissionNotice();
  }

  function saveReflections() {
    state.reflections.q1 = elements.refQ1.value;
    state.reflections.q2 = elements.refQ2.value;
    state.reflections.q3 = elements.refQ3.value;
    saveState();
  }

  function updateSubmissionNotice() {
    const notice = elements.submissionNotice;
    if (state.submissionStatus.submitted) {
      notice.className = 'notice-box notice-success';
      notice.innerHTML = `✅ <strong>Eredmények sikeresen beküldve!</strong> (${new Date(state.submissionStatus.timestamp).toLocaleString('hu-HU')})`;
      notice.style.display = 'block';
    } else {
      notice.className = 'notice-box notice-info';
      notice.innerHTML = `ℹ️ A Google Apps Script gomb még nincs élesítve. Használd a letöltés vagy másolás gombokat a teszteléshez.`;
      notice.style.display = 'block';
    }
  }

  // --- SUBMISSION ACTIONS ---
  async function handleSubmitTeacher() {
    saveReflections();

    if (Object.keys(state.decisions).length < window.SCENARIOS.length) {
      alert('Kérjük, válaszolj mind a 8 helyzetre a beküldés előtt!');
      return;
    }

    const payload = window.SubmissionHandler.buildPayload(state, window.SCENARIOS);
    const result = await window.SubmissionHandler.submitToGoogleAppsScript(GOOGLE_APPS_SCRIPT_URL, payload);

    if (result.success) {
      state.submissionStatus.submitted = true;
      state.submissionStatus.timestamp = new Date().toISOString();
      saveState();
      updateSubmissionNotice();
      alert(result.message);
    } else {
      alert(result.message);
    }
  }

  function handleExportJSON() {
    saveReflections();
    const payload = window.SubmissionHandler.buildPayload(state, window.SCENARIOS);
    window.SubmissionHandler.downloadJSON(payload);
  }

  async function handleCopyJSON() {
    saveReflections();
    const payload = window.SubmissionHandler.buildPayload(state, window.SCENARIOS);
    const success = await window.SubmissionHandler.copyToClipboard(payload);
    if (success) {
      alert('Az eredmények sikeresen másolva a vágólapra JSON formátumban!');
    } else {
      alert('Nem sikerült a másolás. Próbáld a JSON letöltése gombot!');
    }
  }

  // --- RESTART GAME ACTION ---
  function handleRestartGame() {
    const confirmText = 'Biztosan új játékot szeretnél indítani? Az előző játék helyben tárolt eredményei törlődnek.';
    if (confirm(confirmText)) {
      window.StorageHandler.clear();
      state = window.StorageHandler.getInitialState(window.SCENARIOS);
      saveState();

      elements.sessionBadge.textContent = state.sessionId;
      setAppState('START');
    }
  }

  // --- EVENT LISTENERS ATTACHMENT ---
  function attachEventListeners() {
    elements.btnStart.addEventListener('click', () => {
      // If continuing existing progress
      if (Object.keys(state.decisions).length === window.SCENARIOS.length) {
        setAppState('SUMMARY');
      } else {
        // Find first undecided scenario index
        let firstUndecided = 0;
        for (let i = 0; i < window.SCENARIOS.length; i++) {
          if (state.decisions[window.SCENARIOS[i].id]) {
            firstUndecided = i + 1;
          } else {
            break;
          }
        }
        state.currentScenarioIndex = Math.min(firstUndecided, window.SCENARIOS.length - 1);
        setAppState('SCENARIO');
      }
    });

    if (elements.lightboxClose) {
      elements.lightboxClose.addEventListener('click', closeLightbox);
    }
    if (elements.imageModal) {
      elements.imageModal.addEventListener('click', (e) => {
        if (e.target === elements.imageModal) closeLightbox();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.imageModal.classList.contains('active')) {
          closeLightbox();
        }
      });
    }

    elements.btnNextScenario.addEventListener('click', handleNextScenario);

    // Reflection auto-save
    [elements.refQ1, elements.refQ2, elements.refQ3].forEach(input => {
      if (input) input.addEventListener('input', saveReflections);
    });

    elements.btnSubmitTeacher.addEventListener('click', handleSubmitTeacher);
    elements.btnExportJson.addEventListener('click', handleExportJSON);
    elements.btnCopyJson.addEventListener('click', handleCopyJSON);
    if (elements.btnRestartGame) {
      elements.btnRestartGame.addEventListener('click', handleRestartGame);
    }
  }

  // Start app
  init();
});
