/**
 * Unit tests for Digitalis-Lelkiismeret logic and data integrity.
 */

const assert = require('assert');
const { SCENARIOS } = require('../js/scenarios.js');
const { StorageHandler, CURRENT_VERSION } = require('../js/storage.js');
const { SubmissionHandler } = require('../js/submission.js');

console.log('Running Digitalis-Lelkiismeret Unit Tests...\n');

// Test 1: Scenario Data Integrity
console.log('Test 1: Verifying scenario data structure...');
assert.strictEqual(SCENARIOS.length, 8, 'There must be exactly 8 scenarios.');

SCENARIOS.forEach((sc, index) => {
  const scNum = index + 1;
  assert.strictEqual(sc.id, scNum, `Scenario ${scNum} ID mismatch`);
  assert.ok(sc.title && sc.title.length > 0, `Scenario ${scNum} missing title`);
  assert.ok(sc.theme && sc.theme.length > 0, `Scenario ${scNum} missing theme`);
  assert.ok(sc.story && sc.story.length > 0, `Scenario ${scNum} missing story`);
  assert.ok(sc.question && sc.question.length > 0, `Scenario ${scNum} missing question`);

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

// Test 2: Storage Handler Initial State
console.log('\nTest 2: Verifying StorageHandler logic...');
const state = StorageHandler.getInitialState();
assert.strictEqual(state.version, CURRENT_VERSION);
assert.strictEqual(state.currentState, 'START');
assert.ok(state.sessionId.startsWith('DL-'));
assert.strictEqual(Object.keys(state.decisions).length, 0);
console.log('✓ StorageHandler initial state passed verification.');

// Test 3: Payload Preparation
console.log('\nTest 3: Verifying SubmissionHandler payload builder...');
state.decisions = {
  1: 'A', 2: 'B', 3: 'C', 4: 'D',
  5: 'A', 6: 'B', 7: 'C', 8: 'D'
};
state.reflections = {
  q1: 'A 8. volt a legnehezebb.',
  q2: 'A 2. volt a leginkabb elgondolkodtato.',
  q3: 'Mielott megosztok valamit, megkerdezem magamtol...'
};

const payload = SubmissionHandler.buildPayload(state, SCENARIOS);
assert.strictEqual(payload.munkamenet_azonosito, state.sessionId);
assert.strictEqual(payload.dontesek_szama, 8);
assert.strictEqual(payload.dontesek_betui[1], 'A');
assert.strictEqual(payload.dontesek_betui[8], 'D');
assert.ok(payload.dontesek_reszletesen['helyzet_1']);
assert.strictEqual(payload.reflexios_valaszok.q1_legnehezebb_dontes, state.reflections.q1);
console.log('✓ Payload builder passed verification.');

// Test 4: Unconfigured Google Apps Script handling
console.log('\nTest 4: Verifying unconfigured endpoint handling...');
SubmissionHandler.submitToGoogleAppsScript('', payload).then(res => {
  assert.strictEqual(res.success, false);
  assert.strictEqual(res.isConfigured, false);
  assert.ok(res.message.includes('nincs konfigurálva'));
  console.log('✓ Unconfigured endpoint handling passed verification.');
  console.log('\nALL UNIT TESTS PASSED SUCCESSFULLY! 🎉');
}).catch(err => {
  console.error('Unit test failed:', err);
  process.exit(1);
});
