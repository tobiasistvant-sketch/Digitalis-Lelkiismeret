/**
 * DIGITÁLIS LELKIISMERET - Submission & Export Module
 * Handles JSON payload creation, download/clipboard copy, and Google Apps Script endpoint integration.
 */

const SubmissionHandler = {
  /**
   * Prepares the full structured payload for export or server submission.
   */
  buildPayload(state, scenarios) {
    const decisionsDetail = {};

    scenarios.forEach((sc) => {
      const choiceLetter = state.decisions[sc.id];
      if (choiceLetter && sc.choices[choiceLetter]) {
        const choiceObj = sc.choices[choiceLetter];
        decisionsDetail[`helyzet_${sc.id}`] = {
          title: sc.title,
          valasztott_betu: choiceLetter,
          valasztott_megnevezes: choiceObj.shortTitle || choiceObj.label,
          valasz_szoveg: choiceObj.label,
          azonnali_kovetkezmeny: choiceObj.immediate,
          hosszabb_tavu_kovetkezmeny: choiceObj.longTerm,
          etikai_ertelmezes: choiceObj.ethics,
          bibliai_iranymutatas: choiceObj.biblicalGuidance,
          gondold_tovabb_kerdes: choiceObj.question
        };
      }
    });

    return {
      munkamenet_azonosito: state.sessionId,
      app_verzio: state.version || CURRENT_VERSION,
      befejezes_idopontja: new Date().toISOString(),
      dontesek_szama: Object.keys(state.decisions).length,
      dontesek_betui: state.decisions, // e.g. {1: 'A', 2: 'C', ...}
      dontesek_reszletesen: decisionsDetail,
      reflexios_valaszok: {
        q1_legnehezebb_dontes: state.reflections.q1 || '',
        q2_leginkabb_elgondolkodtato: state.reflections.q2 || '',
        q3_sajat_szabaly: state.reflections.q3 || ''
      },
      bekuldesi_statusz: state.submissionStatus.submitted ? 'bekuldve' : 'fuggoben'
    };
  },

  /**
   * Downloads JSON file locally for testing/verification.
   */
  downloadJSON(payload) {
    const filename = `digitalis_lelkiismeret_${payload.munkamenet_azonosito}.json`;
    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * Copies payload to clipboard.
   */
  async copyToClipboard(payload) {
    const jsonStr = JSON.stringify(payload, null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(jsonStr);
      return true;
    } else {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = jsonStr;
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  },

  /**
   * Attempts submission to configured Google Apps Script endpoint URL.
   */
  async submitToGoogleAppsScript(endpointUrl, payload) {
    if (!endpointUrl || endpointUrl.trim() === '' || endpointUrl === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      return {
        success: false,
        isConfigured: false,
        message: 'A Google Apps Script beküldési végpont jelenleg nincs konfigurálva (tesztelési fázis). Az eredményeket az alábbi gombokkal letöltheted vagy másolhatod JSON formátumban.'
      };
    }

    try {
      // Use text/plain or no-cors / JSON stringify depending on Apps Script deployment
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Szerver válaszkód: ${response.status}`);
      }

      const resData = await response.json();
      if (resData && resData.status === 'success') {
        return {
          success: true,
          isConfigured: true,
          message: 'Az eredmények sikeresen elküldve a tanárnak!'
        };
      } else {
        return {
          success: false,
          isConfigured: true,
          message: resData.message || 'Ismeretlen hiba történt a beküldés során.'
        };
      }
    } catch (err) {
      return {
        success: false,
        isConfigured: true,
        message: `Hálózati vagy szerverhiba történt a beküldéskor: ${err.message}. A helyi adatok megmaradtak, újrapróbálkozhatsz.`
      };
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SubmissionHandler };
} else {
  window.SubmissionHandler = SubmissionHandler;
}
