/**
 * DIGITÁLIS LELKIISMERET - Application Logic & UI State Machine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configured Apps Script URL (place real endpoint here when available)
  const GOOGLE_APPS_SCRIPT_URL = '';

  // App State Object
  let state = {
    version: window.CURRENT_VERSION || '1.0.0',
    sessionId: '',
    currentState: 'START',
    currentScenarioIndex: 0,
    selectedChoiceLetter: null,
    decisions: {},
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
    btnSubmitChoice: document.getElementById('btn-submit-choice'),

    // Consequence screen
    consequenceStepIndicator: document.getElementById('consequence-step-indicator'),
    consequenceChoiceBadge: document.getElementById('consequence-choice-badge'),
    consequenceProgressBarFill: document.getElementById('consequence-progress-bar-fill'),
    consequenceTitle: document.getElementById('consequence-title'),
    selectedChoiceDisplay: document.getElementById('selected-choice-display'),
    consequenceImmediateText: document.getElementById('consequence-immediate-text'),
    consequenceLongtermText: document.getElementById('consequence-longterm-text'),
    consequenceEthicsText: document.getElementById('consequence-ethics-text'),
    consequenceBiblicalText: document.getElementById('consequence-biblical-text'),
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

    // Confirmation Modal
    confirmModal: document.getElementById('confirm-modal'),
    modalChoicePreview: document.getElementById('modal-selected-choice-preview'),
    modalBtnConfirm: document.getElementById('modal-btn-confirm'),
    modalBtnCancel: document.getElementById('modal-btn-cancel')
  };

  // --- INIT APPLICATION ---
  function init() {
    const loaded = window.StorageHandler.load();
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

    // Close modal
    hideModal();

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
          if (state.currentState === 'CONFIRM') {
            showModal();
          }
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

    // Choices Radio Grid
    elements.choicesGrid.innerHTML = '';
    elements.btnSubmitChoice.disabled = !state.selectedChoiceLetter;

    ['A', 'B', 'C', 'D'].forEach(letter => {
      const choice = sc.choices[letter];
      const card = document.createElement('div');
      const isSelected = state.selectedChoiceLetter === letter;
      card.className = `choice-card ${isSelected ? 'selected' : ''}`;
      card.setAttribute('role', 'radio');
      card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
      card.setAttribute('tabindex', '0');
      card.dataset.letter = letter;

      card.innerHTML = `
        <div class="choice-letter-badge">${letter}</div>
        <div class="choice-text">${choice.label}</div>
      `;

      card.addEventListener('click', () => selectChoice(letter));
      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          selectChoice(letter);
        }
      });

      elements.choicesGrid.appendChild(card);
    });
  }

  function selectChoice(letter) {
    state.selectedChoiceLetter = letter;
    const cards = elements.choicesGrid.querySelectorAll('.choice-card');
    cards.forEach(card => {
      if (card.dataset.letter === letter) {
        card.classList.add('selected');
        card.setAttribute('aria-checked', 'true');
      } else {
        card.classList.remove('selected');
        card.setAttribute('aria-checked', 'false');
      }
    });
    elements.btnSubmitChoice.disabled = false;
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
          <div class="mockup-header">
            <div class="mockup-title-area">
              <div class="mockup-icon">👥</div>
              <div>
                <div class="mockup-name">Osztálycsoport (XII. B)</div>
                <div class="mockup-sub">Online üzenetváltás</div>
              </div>
            </div>
          </div>
          <p class="mockup-story-p">${formattedStory}</p>
          <div class="chat-window">
            ${sc.chatMessages ? sc.chatMessages.map(msg => `
              <div class="chat-bubble ${msg.isKey ? 'key-message' : ''}">
                <div class="chat-sender">${msg.sender} <span class="time">${msg.time}</span></div>
                <div>${msg.text}</div>
                ${msg.text.includes('mém') ? '<div class="chat-image-attachment">🖼️ [Máté_mém_kínos_kép.jpg]</div>' : ''}
              </div>
            `).join('') : ''}
          </div>
        `;
        break;

      case 'social_post_comments':
        innerHTML = `
          <div class="mockup-header">
            <div class="mockup-title-area">
              <div class="mockup-icon">🌐</div>
              <div>
                <div class="mockup-name">Nyilvános Bejegyzés & Kommentek</div>
                <div class="mockup-sub">Közösségi média felület</div>
              </div>
            </div>
          </div>
          <p class="mockup-story-p">${formattedStory}</p>
          <div class="post-card">
            <div class="chat-sender">Tegnap este - Nyilvános bejegyzés</div>
            <div style="margin-top:0.5rem; font-style:italic;">„...te sértő komment hozzászólásod...”</div>
            <div class="screenshot-badge">📸 Képernyőkép készült és megosztásra került!</div>
          </div>
        `;
        break;

      case 'ai_chat_editor':
        innerHTML = `
          <div class="mockup-header">
            <div class="mockup-title-area">
              <div class="mockup-icon">🤖</div>
              <div>
                <div class="mockup-name">AI Assistant & Beadandó Dokumentum</div>
                <div class="mockup-sub">Határidő: Holnap 08:00</div>
              </div>
            </div>
          </div>
          <p class="mockup-story-p">${formattedStory}</p>
          <div class="ai-interface">
            <div class="ai-prompt-box">💬 Prompt: „Készíts egy teljes dolgozatot a megadott témában!”</div>
            <div class="ai-output-box">
              📄 Generált szöveg (100% elkészült):<br>
              „A téma etikai és társadalmi vonatkozásai rendkívül összetettek...”
            </div>
          </div>
        `;
        break;

      case 'news_feed':
        innerHTML = `
          <div class="mockup-header">
            <div class="mockup-title-area">
              <div class="mockup-icon">📰</div>
              <div>
                <div class="mockup-name">Közösségi Hírfolyam</div>
                <div class="mockup-sub">Szenzációs bejegyzés</div>
              </div>
            </div>
          </div>
          <p class="mockup-story-p">${formattedStory}</p>
          <div class="news-card">
            <div class="news-card-body">
              <div class="news-card-title">🚨 RENDKÍVÜLI: Súlyos visszaélés az ismert intézményben!</div>
              <div class="news-stats">
                <span>❤️👍 4.2k reakció</span>
                <span>💬 850 hozzászólás</span>
                <span class="no-source-warning">⚠️ Hiányzó ellenőrizhető forrás!</span>
              </div>
            </div>
          </div>
        `;
        break;

      case 'private_chat':
        innerHTML = `
          <div class="mockup-header">
            <div class="mockup-title-area">
              <div class="mockup-icon">🔒</div>
              <div>
                <div class="mockup-name">Privát Chat</div>
                <div class="mockup-sub">Bizalmas üzenetváltás</div>
              </div>
            </div>
          </div>
          <p class="mockup-story-p">${formattedStory}</p>
          <div class="chat-bubble" style="border-left: 3px solid var(--color-turquoise);">
            <div class="chat-sender">Barátod</div>
            <div>„Kérlek, ezt kezeld teljesen bizalmasan, senkinek ne mondd el...”</div>
          </div>
        `;
        break;

      case 'public_debate':
        innerHTML = `
          <div class="mockup-header">
            <div class="mockup-title-area">
              <div class="mockup-icon">💬</div>
              <div>
                <div class="mockup-name">Nyilvános Kommentvita</div>
                <div class="mockup-sub">Vallás és Etika téma</div>
              </div>
            </div>
          </div>
          <p class="mockup-story-p">${formattedStory}</p>
          <div class="chat-bubble key-message" style="width:100%;">
            <div class="chat-sender">Vitapartner</div>
            <div>„Na, erre mit mondasz, ha olyan nagy hívő vagy?”</div>
          </div>
        `;
        break;

      case 'late_night_feed':
        innerHTML = `
          <div class="mockup-header">
            <div class="mockup-title-area">
              <div class="mockup-icon">🌙</div>
              <div>
                <div class="mockup-name">Éjszakai Telefonképernyő</div>
                <div class="mockup-sub">Másnap dolgozat!</div>
              </div>
            </div>
          </div>
          <p class="mockup-story-p">${formattedStory}</p>
          <div class="night-container">
            <div class="clock-display">00:17</div>
            <div class="feed-notification">🔥 „Ezt még látnod kell! (0:40s)”</div>
          </div>
        `;
        break;

      case 'ai_generator':
        innerHTML = `
          <div class="mockup-header">
            <div class="mockup-title-area">
              <div class="mockup-icon">🎨</div>
              <div>
                <div class="mockup-name">AI Képgenerátor Szerkesztő</div>
                <div class="mockup-sub">Megalázó generált kép</div>
              </div>
            </div>
          </div>
          <p class="mockup-story-p">${formattedStory}</p>
          <div class="generator-preview">
            <div class="generator-placeholder">
              <span>🖼️ [Sematikus Élethű AI Előnézet: Tanár megalázó helyzetben]</span>
              <span>⚠️ Mesterségesen generált tartalom</span>
            </div>
          </div>
        `;
        break;

      default:
        innerHTML = `<p class="mockup-story-p">${formattedStory}</p>`;
    }

    container.innerHTML = innerHTML;
  }

  // --- CONFIRMATION MODAL HANDLERS ---
  function showModal() {
    const scenarioIndex = state.currentScenarioIndex;
    const sc = window.SCENARIOS[scenarioIndex];
    const letter = state.selectedChoiceLetter;
    const choice = sc.choices[letter];

    elements.modalChoicePreview.textContent = `Választott döntés (${letter}): ${choice.label}`;
    elements.confirmModal.classList.add('active');
    elements.confirmModal.setAttribute('aria-hidden', 'false');
    elements.modalBtnConfirm.focus();
  }

  function hideModal() {
    elements.confirmModal.classList.remove('active');
    elements.confirmModal.setAttribute('aria-hidden', 'true');
  }

  function confirmDecision() {
    const scenarioIndex = state.currentScenarioIndex;
    const sc = window.SCENARIOS[scenarioIndex];

    // Safety Guard: Once recorded, never overwrite
    if (state.decisions[sc.id]) {
      hideModal();
      setAppState('CONSEQUENCE');
      return;
    }

    const letter = state.selectedChoiceLetter;
    if (!letter) {
      hideModal();
      setAppState('SCENARIO');
      return;
    }

    // Permanently record decision
    state.decisions[sc.id] = letter;
    saveState();

    hideModal();
    setAppState('CONSEQUENCE');
  }

  function cancelModal() {
    hideModal();
    setAppState('SCENARIO');
  }

  // --- CONSEQUENCE SCREEN RENDER ---
  function renderConsequenceScreen() {
    const scenarioIndex = state.currentScenarioIndex;
    const sc = window.SCENARIOS[scenarioIndex];
    const letter = state.decisions[sc.id];
    const choice = sc.choices[letter];

    const stepNum = scenarioIndex + 1;
    elements.consequenceStepIndicator.textContent = `${stepNum} / ${window.SCENARIOS.length} Helyzet`;
    elements.consequenceChoiceBadge.textContent = `Kiválasztott döntés: ${letter}`;
    elements.consequenceProgressBarFill.style.width = `${(stepNum / window.SCENARIOS.length) * 100}%`;

    elements.consequenceTitle.textContent = sc.title;
    elements.selectedChoiceDisplay.textContent = `${letter} – ${choice.label}`;

    elements.consequenceImmediateText.textContent = choice.immediate;
    elements.consequenceLongtermText.textContent = choice.longTerm;
    elements.consequenceEthicsText.textContent = choice.ethics;
    elements.consequenceBiblicalText.textContent = choice.biblicalGuidance;
    elements.consequenceThinkText.textContent = choice.question;

    if (scenarioIndex === window.SCENARIOS.length - 1) {
      elements.btnNextScenarioText.textContent = 'Eredményeim megtekintése';
    } else {
      elements.btnNextScenarioText.textContent = 'Tovább a következő helyzetre';
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
    window.SCENARIOS.forEach((sc, idx) => {
      const letter = state.decisions[sc.id] || '-';
      const choiceObj = sc.choices[letter];
      const titleShort = choiceObj ? choiceObj.shortTitle || choiceObj.label : 'Nincs döntés';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${idx + 1}.</strong></td>
        <td>${sc.title}</td>
        <td><span class="choice-pill">${letter}</span></td>
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

    elements.btnSubmitChoice.addEventListener('click', () => {
      if (state.selectedChoiceLetter) {
        setAppState('CONFIRM');
      }
    });

    elements.modalBtnConfirm.addEventListener('click', confirmDecision);
    elements.modalBtnCancel.addEventListener('click', cancelModal);

    elements.btnNextScenario.addEventListener('click', handleNextScenario);

    // Reflection auto-save
    [elements.refQ1, elements.refQ2, elements.refQ3].forEach(input => {
      input.addEventListener('input', saveReflections);
    });

    elements.btnSubmitTeacher.addEventListener('click', handleSubmitTeacher);
    elements.btnExportJson.addEventListener('click', handleExportJSON);
    elements.btnCopyJson.addEventListener('click', handleCopyJSON);
  }

  // Start app
  init();
});
