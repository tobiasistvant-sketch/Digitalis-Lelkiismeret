/**
 * DIGITÁLIS LELKIISMERET - Storage Handler Module
 * Manages localStorage, version checking, and state persistence.
 */

const STORAGE_KEY = 'digitalis_lelkiismeret_state_v1';
const CURRENT_VERSION = '1.0.0';

function generateSessionId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'DL-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Fisher-Yates shuffle algorithm for choice keys ['A', 'B', 'C', 'D']
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates choice key mappings for all 8 scenarios.
 * Returns object { scenarioId: ['B', 'D', 'A', 'C'] }
 */
function generateChoiceOrders(scenarios) {
  const orders = {};
  const list = scenarios || (typeof window !== 'undefined' ? window.SCENARIOS : []);
  if (list && list.length > 0) {
    list.forEach(sc => {
      orders[sc.id] = shuffleArray(['A', 'B', 'C', 'D']);
    });
  } else {
    for (let i = 1; i <= 8; i++) {
      orders[i] = shuffleArray(['A', 'B', 'C', 'D']);
    }
  }
  return orders;
}

const StorageHandler = {
  getInitialState(scenarios) {
    return {
      version: CURRENT_VERSION,
      sessionId: generateSessionId(),
      currentState: 'START', // START, SCENARIO, CONFIRM, CONSEQUENCE, SUMMARY, REFLECTION, SUBMISSION
      currentScenarioIndex: 0,
      selectedChoiceLetter: null,
      decisions: {}, // scenarioId -> originalChoiceKey ('A', 'B', 'C', or 'D')
      choiceOrders: generateChoiceOrders(scenarios), // scenarioId -> Array of originalChoiceKeys in shuffled display order
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
  },

  load(scenarios) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const newState = this.getInitialState(scenarios);
        this.save(newState);
        return { state: newState, versionMismatch: false };
      }

      const parsed = JSON.parse(raw);
      if (!parsed.version || parsed.version.split('.')[0] !== CURRENT_VERSION.split('.')[0]) {
        // Major version mismatch
        return {
          state: parsed,
          versionMismatch: true,
          message: 'A tárolt adatok egy régebbi alkalmazásverzióból származnak. Előfordulhat, hogy a haladás nem teljesen kompatibilis.'
        };
      }

      // Ensure choiceOrders exists for older saved states
      if (!parsed.choiceOrders) {
        parsed.choiceOrders = generateChoiceOrders(scenarios);
        this.save(parsed);
      }

      return { state: parsed, versionMismatch: false };
    } catch (e) {
      console.error('Hibás tárolt adat, új állapot indítása:', e);
      const newState = this.getInitialState(scenarios);
      this.save(newState);
      return { state: newState, versionMismatch: false };
    }
  },

  save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Nem sikerült menteni a helyi tárolóba:', e);
    }
  },

  clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Nem sikerült törölni a helyi tárolót:', e);
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StorageHandler, CURRENT_VERSION, generateChoiceOrders, shuffleArray };
} else {
  window.StorageHandler = StorageHandler;
  window.CURRENT_VERSION = CURRENT_VERSION;
}
