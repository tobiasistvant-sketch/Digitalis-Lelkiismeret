const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('DIGITÁLIS LELKIISMERET Frontend Verification', () => {
  test('Complete student flow: Start -> 8 Decisions -> Summary -> Reflection -> Export', async ({ page }) => {
    // Open application index.html
    const fileUrl = 'file://' + path.resolve(__dirname, '../index.html');
    await page.goto(fileUrl);

    // 1. Check Title on Start Screen
    await expect(page.locator('#start-title')).toHaveText('DIGITÁLIS LELKIISMERET');

    // Take screenshot of Start Screen
    await page.screenshot({ path: path.resolve(__dirname, 'screenshots/01_start_screen.png') });

    // Click Start
    await page.click('#btn-start');

    // Loop through all 8 scenarios
    for (let i = 1; i <= 8; i++) {
      // Expect scenario screen
      await expect(page.locator('#scenario-step-indicator')).toContainText(`${i} / 8 Helyzet`);

      if (i === 1) {
        await page.screenshot({ path: path.resolve(__dirname, 'screenshots/02_scenario_1.png') });
      }

      // Select choice (A for odd, C for even scenarios)
      const choiceLetter = (i % 2 === 1) ? 'A' : 'C';
      await page.click(`.choice-card[data-letter="${choiceLetter}"]`);

      // Click Confirm Choice button
      await page.click('#btn-submit-choice');

      // Modal should appear
      await expect(page.locator('#confirm-modal')).toHaveClass(/active/);

      if (i === 1) {
        await page.screenshot({ path: path.resolve(__dirname, 'screenshots/03_confirm_modal.png') });
      }

      // Confirm decision in modal
      await page.click('#modal-btn-confirm');

      // Expect Consequence screen
      await expect(page.locator('#consequence-choice-badge')).toContainText(`Kiválasztott döntés: ${choiceLetter}`);

      if (i === 1) {
        await page.screenshot({ path: path.resolve(__dirname, 'screenshots/04_consequence_feedback.png') });
      }

      // Click next scenario button
      await page.click('#btn-next-scenario');
    }

    // 2. We should now be on the Summary Screen
    await expect(page.locator('#summary-title')).toHaveText('A döntéseid nyomot hagynak');

    // Fill in reflections
    await page.fill('#ref-q1', 'A 8. AI-képes döntés volt a legnehezebb.');
    await page.fill('#ref-q2', 'A 2. sértő kommentes helyzet gondolkodtatott el.');
    await page.fill('#ref-q3', 'Mielőtt megosztok valamit, mindig belegondolok a másik helyzetébe.');

    // Screenshot of summary
    await page.screenshot({ path: path.resolve(__dirname, 'screenshots/05_summary_reflection.png'), fullPage: true });

    // Click Copy JSON button
    await page.click('#btn-copy-json');
  });
});
