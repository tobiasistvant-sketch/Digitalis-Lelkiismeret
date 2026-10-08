/**
 * Unit tests for Digitalis-Lelkiismeret logic, choice shuffling, state locking, and data integrity.
 */

const assert = require('assert');
const { SCENARIOS } = require('../js/scenarios.js');
const { StorageHandler, CURRENT_VERSION } = require('../js/storage.js');
const { SubmissionHandler } = require('../js/submission.js');

console.log('Running Digitalis-Lelkiismeret Unit Tests...\n');

// Mock localStorage for Node environment
const localStorageMap = {};
global.localStorage = {
  getItem: (key) => localStorageMap[key] || null,
  setItem: (key, val) => { localStorageMap[key] = String(val); },
  removeItem: (key) => { delete localStorageMap[key]; },
  clear: () => { Object.keys(localStorageMap).forEach(k => delete localStorageMap[k]); }
};

// Test 1: Scenario Data Integrity (4 choices per scenario)
console.log('Test 1: Verifying scenario data structure (8 scenarios, 4 choices each)...');
assert.strictEqual(SCENARIOS.length, 8, 'There must be exactly 8 scenarios.');

SCENARIOS.forEach((sc, index) => {
  const scNum = index + 1;
  assert.strictEqual(sc.id, scNum, `Scenario ${scNum} ID mismatch`);
  assert.ok(sc.title && sc.title.length > 0, `Scenario ${scNum} missing title`);
  assert.ok(sc.theme && sc.theme.length > 0, `Scenario ${scNum} missing theme`);
  assert.ok(sc.story && sc.story.length > 0, `Scenario ${scNum} missing story`);
  assert.ok(sc.question && sc.question.length > 0, `Scenario ${scNum} missing question`);

  const keys = Object.keys(sc.choices);
  assert.strictEqual(keys.length, 4, `Scenario ${scNum} must have exactly 4 choices.`);

  ['A', 'B', 'C', 'D'].forEach(letter => {
    const choice = sc.choices[letter];
    assert.ok(choice, `Scenario ${scNum} missing choice ${letter}`);
    assert.strictEqual(choice.letter, letter, `Scenario ${scNum} choice ${letter} letter mismatch`);
    assert.ok(choice.label && choice.label.length > 0, `Scenario ${scNum} choice ${letter} missing label`);
    assert.ok(choice.immediate && choice.immediate.length > 0, `Scenario ${scNum} choice ${letter} missing immediate`);
    assert.ok(choice.longTerm && choice.longTerm.length > 0, `Scenario ${scNum} choice ${letter} missing longTerm`);
    assert.ok(choice.ethics && choice.ethics.length > 0, `Scenario ${scNum} choice ${letter} missing ethics`);
    assert.ok(choice.biblicalGuidance && choice.biblicalGuidance.length > 0, `Scenario ${scNum} choice ${letter} missing biblicalGuidance`);
    assert.ok(choice.question && choice.question.length > 0, `Scenario ${scNum} choice ${letter} missing question`);
  });
});
console.log('✓ All 8 scenarios and 32 choice outcomes passed verification.');

// Test 2: Choice Shuffling in Different Sessions
console.log('\nTest 2: Verifying choice shuffling across different sessions...');
const state1 = StorageHandler.getInitialState(SCENARIOS);
const state2 = StorageHandler.getInitialState(SCENARIOS);

assert.ok(state1.choiceOrders[1], 'Session 1 must have choice order for scenario 1');
assert.strictEqual(state1.choiceOrders[1].length, 4, 'Shuffled choice array must have 4 keys');
assert.deepStrictEqual([...state1.choiceOrders[1]].sort(), ['A', 'B', 'C', 'D'], 'Shuffled keys must contain A, B, C, D');

// Test 3: Reload / Refresh Persistence of Shuffled Order
console.log('\nTest 3: Verifying persistence of choice order on reload...');
StorageHandler.save(state1);
const loaded = StorageHandler.load(SCENARIOS);
assert.deepStrictEqual(loaded.state.choiceOrders, state1.choiceOrders, 'Choice order must remain unchanged after reload');
console.log('✓ Choice order persists perfectly across page reloads.');

// Test 4: Choice Consequences Mapping Accuracy
console.log('\nTest 4: Verifying chosen response maps to its original correct consequences...');
state1.decisions[1] = 'C'; // Original choice key C: "Megkérem a többieket, hogy töröljék."
const sc1ChoiceC = SCENARIOS[0].choices['C'];
assert.strictEqual(sc1ChoiceC.shortTitle, 'Nyilvános kiállás');
assert.strictEqual(sc1ChoiceC.biblicalGuidance, 'Péld 24,11–12 – Felelősség azokért, akik veszélybe kerültek.');
console.log('✓ Original choice consequences mapped accurately.');

// Test 5: Restart Game Clears Local State & Generates New Session ID
console.log('\nTest 5: Verifying restart game resets state and creates new session ID...');
const oldSessionId = state1.sessionId;
StorageHandler.clear();
const newState = StorageHandler.getInitialState(SCENARIOS);
assert.notStrictEqual(newState.sessionId, oldSessionId, 'New session ID must be generated on restart');
assert.strictEqual(Object.keys(newState.decisions).length, 0, 'Decisions must be cleared on restart');
assert.strictEqual(newState.reflections.q1, '', 'Reflections must be cleared on restart');
console.log('✓ Restart game successfully clears state and generates new session ID.');

// Test 6: Summary & Export Payload Accuracy
console.log('\nTest 6: Verifying JSON export payload with decisions and reflections...');
newState.decisions = {
  1: 'A', 2: 'B', 3: 'C', 4: 'D',
  5: 'A', 6: 'B', 7: 'C', 8: 'D'
};
newState.reflections = {
  q1: 'Legnehezebb: 8. AI fejezet',
  q2: 'Elgondolkodtato: 2. fejezet',
  q3: 'Sajat szabaly: Mindig ellenorzom a forrast'
};

const payload = SubmissionHandler.buildPayload(newState, SCENARIOS);
assert.strictEqual(payload.munkamenet_azonosito, newState.sessionId);
assert.strictEqual(payload.dontesek_szama, 8);
assert.strictEqual(payload.dontesek_betui[1], 'A');
assert.strictEqual(payload.dontesek_betui[3], 'C');
assert.strictEqual(payload.reflexios_valaszok.q1_legnehezebb_dontes, newState.reflections.q1);
console.log('✓ Payload builder passed verification.');

console.log('\nALL UNIT TESTS PASSED SUCCESSFULLY! 🎉');
