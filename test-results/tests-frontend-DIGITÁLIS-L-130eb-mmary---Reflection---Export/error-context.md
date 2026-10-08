# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/frontend.spec.js >> DIGITÁLIS LELKIISMERET Frontend Verification >> Complete student flow: Start -> 8 Decisions -> Summary -> Reflection -> Export
- Location: tests/frontend.spec.js:5:3

# Error details

```
Error: expect(locator).toHaveClass(expected) failed

Locator: locator('#confirm-modal')
Expected pattern: /active/
Received string:  "modal-overlay"
Timeout: 5000ms

Call log:
  - Expect "toHaveClass" locator('#confirm-modal') with timeout 5000ms
  - waiting for locator('#confirm-modal')
    14 × locator resolved to <div tabindex="-1" role="dialog" id="confirm-modal" aria-hidden="true" class="modal-overlay" aria-labelledby="modal-title" aria-describedby="modal-desc">…</div>
       - unexpected value "modal-overlay"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Ugrás a fő tartalomhoz" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e11]:
          - generic [ref=e12]: DIGITÁLIS LELKIISMERET
          - generic [ref=e13]: Te hogyan döntenél?
        - generic [ref=e14]:
          - generic [ref=e15]: Református vallás – keresztyén etika
          - generic [ref=e16]: DL-YGXFT9
    - main [ref=e17]:
      - region [ref=e18]:
        - generic [ref=e19]:
          - generic [ref=e20]:
            - generic [ref=e21]: 1 / 8 Helyzet
            - generic [ref=e22]: Online megszégyenítés, emberi méltóság, felelősség.
          - progressbar [ref=e23]
        - generic [ref=e25]:
          - generic [ref=e26]:
            - generic [ref=e28]:
              - generic [ref=e29]: 👥
              - generic [ref=e30]:
                - generic [ref=e31]: Osztálycsoport (XII. B)
                - generic [ref=e32]: Online üzenetváltás
            - paragraph [ref=e33]: Az osztálycsoportban valaki megoszt egy kínos fényképet Mátéról. A kép egy iskolai rendezvényen készült, amikor Máté kellemetlen helyzetbe került.
            - paragraph [ref=e34]: Néhányan nevetnek, valaki mémként szerkeszti tovább. A kép már egy másik csoportba is eljutott.
            - paragraph [ref=e35]: "Lilla új üzenetet küld: „Na, ki küldi tovább? 😂”"
            - generic [ref=e36]:
              - generic [ref=e37]:
                - generic [ref=e38]:
                  - text: Péter
                  - generic [ref=e39]: 14:22
                - generic [ref=e40]: Haha nézzétek meg ezt! 😂
              - generic [ref=e41]:
                - generic [ref=e42]:
                  - text: MémGen
                  - generic [ref=e43]: 14:23
                - generic [ref=e44]: "[Kép csatolva: Máté_mém_v1.jpg]"
                - generic [ref=e45]: 🖼️ [Máté_mém_kínos_kép.jpg]
              - generic [ref=e46]:
                - generic [ref=e47]:
                  - text: Lilla
                  - generic [ref=e48]: 14:25
                - generic [ref=e49]: Na, ki küldi tovább? 😂
          - generic [ref=e50]:
            - generic [ref=e51]:
              - heading "A KÍNOS FOTÓ" [level=2] [ref=e52]
              - paragraph [ref=e53]: Te mit tennél?
            - radiogroup "Te mit tennél?" [ref=e54]:
              - radio "A Továbbküldöm. Ez csak egy vicces kép." [ref=e55] [cursor=pointer]:
                - generic [ref=e56]: A
                - generic [ref=e57]: Továbbküldöm. Ez csak egy vicces kép.
              - radio "B Nem küldöm tovább, de nem is szólok." [ref=e58] [cursor=pointer]:
                - generic [ref=e59]: B
                - generic [ref=e60]: Nem küldöm tovább, de nem is szólok.
              - radio "C Megkérem a többieket, hogy töröljék." [ref=e61] [cursor=pointer]:
                - generic [ref=e62]: C
                - generic [ref=e63]: Megkérem a többieket, hogy töröljék.
              - radio "D Privátban megkérdezem Mátét, segíthetek-e." [ref=e64] [cursor=pointer]:
                - generic [ref=e65]: D
                - generic [ref=e66]: Privátban megkérdezem Mátét, segíthetek-e.
            - button "Döntés kiválasztása" [disabled] [ref=e68]
    - contentinfo [ref=e72]:
      - generic [ref=e73]:
        - paragraph [ref=e74]: © DIGITÁLIS LELKIISMERET | Református vallás – keresztyén etika (XII. osztály)
        - paragraph [ref=e75]: "Bibliai hivatkozások: RÚF 2014 (Revideált új fordítású Biblia)"
  - dialog [aria-hidden]:
    - generic:
      - generic:
        - generic [aria-hidden]: ⚠️
        - heading [level=3]: Ez a végleges döntésed?
      - generic:
        - paragraph: A választásod rögzítésre kerül. Ezután megismerheted a lehetséges következményeket, de a döntéseden már nem változtathatsz.
      - generic:
        - button: Megerősítem a döntést
        - button: Még nem döntöttem
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const path = require('path');
  3  |
  4  | test.describe('DIGITÁLIS LELKIISMERET Frontend Verification', () => {
  5  |   test('Complete student flow: Start -> 8 Decisions -> Summary -> Reflection -> Export', async ({ page }) => {
  6  |     // Open application index.html
  7  |     const fileUrl = 'file://' + path.resolve(__dirname, '../index.html');
  8  |     await page.goto(fileUrl);
  9  |
  10 |     // 1. Check Title on Start Screen
  11 |     await expect(page.locator('#start-title')).toHaveText('DIGITÁLIS LELKIISMERET');
  12 |
  13 |     // Take screenshot of Start Screen
  14 |     await page.screenshot({ path: path.resolve(__dirname, 'screenshots/01_start_screen.png') });
  15 |
  16 |     // Click Start
  17 |     await page.click('#btn-start');
  18 |
  19 |     // Loop through all 8 scenarios
  20 |     for (let i = 1; i <= 8; i++) {
  21 |       // Expect scenario screen
  22 |       await expect(page.locator('#scenario-step-indicator')).toContainText(`${i} / 8 Helyzet`);
  23 |
  24 |       if (i === 1) {
  25 |         await page.screenshot({ path: path.resolve(__dirname, 'screenshots/02_scenario_1.png') });
  26 |       }
  27 |
  28 |       // Select choice (A for odd, C for even scenarios)
  29 |       const choiceLetter = (i % 2 === 1) ? 'A' : 'C';
  30 |       await page.click(`.choice-card[data-letter="${choiceLetter}"]`);
  31 |
  32 |       // Click Confirm Choice button
  33 |       await page.click('#btn-submit-choice');
  34 |
  35 |       // Modal should appear
> 36 |       await expect(page.locator('#confirm-modal')).toHaveClass(/active/);
     |                                                    ^ Error: expect(locator).toHaveClass(expected) failed
  37 |
  38 |       if (i === 1) {
  39 |         await page.screenshot({ path: path.resolve(__dirname, 'screenshots/03_confirm_modal.png') });
  40 |       }
  41 |
  42 |       // Confirm decision in modal
  43 |       await page.click('#modal-btn-confirm');
  44 |
  45 |       // Expect Consequence screen
  46 |       await expect(page.locator('#consequence-choice-badge')).toContainText(`Kiválasztott döntés: ${choiceLetter}`);
  47 |
  48 |       if (i === 1) {
  49 |         await page.screenshot({ path: path.resolve(__dirname, 'screenshots/04_consequence_feedback.png') });
  50 |       }
  51 |
  52 |       // Click next scenario button
  53 |       await page.click('#btn-next-scenario');
  54 |     }
  55 |
  56 |     // 2. We should now be on the Summary Screen
  57 |     await expect(page.locator('#summary-title')).toHaveText('A döntéseid nyomot hagynak');
  58 |
  59 |     // Fill in reflections
  60 |     await page.fill('#ref-q1', 'A 8. AI-képes döntés volt a legnehezebb.');
  61 |     await page.fill('#ref-q2', 'A 2. sértő kommentes helyzet gondolkodtatott el.');
  62 |     await page.fill('#ref-q3', 'Mielőtt megosztok valamit, mindig belegondolok a másik helyzetébe.');
  63 |
  64 |     // Screenshot of summary
  65 |     await page.screenshot({ path: path.resolve(__dirname, 'screenshots/05_summary_reflection.png'), fullPage: true });
  66 |
  67 |     // Click Copy JSON button
  68 |     await page.click('#btn-copy-json');
  69 |   });
  70 | });
  71 |
```