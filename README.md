# DIGITÁLIS LELKIISMERET

> **Te hogyan döntenél?**
> Interaktív keresztyén internetetikai döntésjáték XII. osztályos tanulók számára.

![Licence](https://img.shields.io/badge/subject-Reform%C3%A1tus%20vall%C3%A1s%20--%20kereszty%C3%A9n%20etika-071E2F?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Production%20Ready-31B6C7?style=for-the-badge)

---

## 1. A Tananyag Célja és Pedagógiai Alapelvei

A **DIGITÁLIS LELKIISMERET** egy nyolc döntéshelyzetből álló interaktív webalkalmazás, amely a digitális kultúra és a keresztyén etika metszéspontjában segíti a tanulók erkölcsi ítélőképességét.

- **Nincs pontozás vagy osztályzás:** Nem minősíti a tanulót, hanem a tettek és mulasztások lehetséges következményeire világít rá.
- **Egyirányú progression:** A meghozott és megerősített döntések véglegesek, visszalépésre vagy újrapróbálkozásra nincs lehetőség.
- **5 blokkos strukturált visszajelzés:** Minden döntéshez egyedi azonnali következmény, hosszabb távú következmény, etikai értelmezés, **RÚF 2014** alapú bibliai iránymutatás és gondolkodtató kérdés tartozik.

---

## 2. A Nyolc Erkölcsi Döntéshelyzet

1. **A KÍNOS FOTÓ** – Online megszégyenítés, emberi méltóság, felelősség. *(Ef 4,29)*
2. **AZ INTERNET NEM FELEJT** – Sértő komment, harag, bűnbánat, jóvátétel. *(Mt 5,23–24)*
3. **AZ AI MINDENT MEGOLD?** – Mesterséges intelligencia, becsületesség, tanulás. *(Péld 12,22)*
4. **EGY HÍR, AMELY TÚL HIHETŐ** – Álhírek, igazság, felelős tájékozódás. *(2Móz 20,16)*
5. **A PRIVÁT ÜZENET** – Bizalom, titoktartás, személyes információk. *(Péld 11,13)*
6. **A KOMMENTHÁBORÚ** – Hitvallás, szólásszabadság, tisztelet, vallási vita. *(1Pt 3,15–16)*
7. **CSAK MÉG ÖT PERC!** – Képernyőidő, szabadság, önuralom, digitális szokások. *(1Kor 6,12)*
8. **A MESTERSÉGES ARC** – AI-képek, hamisítás, emberi méltóság, felelősség. *(2Móz 20,16)*

---

## 3. Technikai Architektúra & Fájlszerkezet

Alkalmazásunk tiszta HTML5, CSS3 és vanilla JavaScript (ES6) alapon épült, keretrendszer-függőségek nélkül a maximális stabilitás és LIVRESQ/GitHub Pages kompatibilitás érdekében.

```
Digitalis-Lelkiismeret/
├── index.html              # Fő belépési pont és reszponzív HTML szerkezet
├── css/
│   └── styles.css          # Deep blue (#071E2F) téma, animációk és akadálymentesítés
├── js/
│   ├── scenarios.js        # A 8 történet és 32 következmény adatai (RÚF 2014)
│   ├── storage.js          # Helyi mentés (localStorage) és munkamenet kezelés
│   ├── submission.js       # Eredmények JSON exportálása és Google Apps Script hívás
│   └── app.js              # Állapotgép és UI interakciók
├── docs/
│   └── teacher-guide.md    # Részletes magyar nyelvű tanári útmutató
├── tests/
│   ├── app_logic.test.js   # Node.js egységtesztek az adatokra és állapotgépre
│   └── frontend.spec.js    # Playwright E2E böngésző teszt
└── README.md
```

---

## 4. GitHub Pages & LIVRESQ Publikálás

### GitHub Pages beállítása
1. Lépj a GitHub repository **Settings > Pages** menüpontjába.
2. A **Source** résznél válaszd a `Deploy from a branch` lehetőséget.
3. Válaszd ki a `main` ágat és a `/ (root)` könyvtárat, majd kattints a **Save** gombra.
4. Néhány percen belül az alkalmazás elérhetővé válik a HTTPS URL-en.

### LIVRESQ Beágyazás
A tananyag beágyazható bármilyen LIVRESQ digitális leckébe az alábbi `iframe` kóddal:

```html
<iframe src="https://<USER>.github.io/Digitalis-Lelkiismeret/"
        width="100%"
        height="850px"
        style="border:none; border-radius:12px;"
        allowfullscreen>
</iframe>
```

---

## 5. Google Sheets / Google Apps Script Integráció

Az alkalmazás fel van készítve a tanulói eredmények automatikus gyűjtésére:

1. Hozz létre egy Google Apps Script webalkalmazást a kívánt Google Sheets táblázathoz.
2. Illeszd be a kapott Web App URL-t a `js/app.js` fájl `GOOGLE_APPS_SCRIPT_URL` változójába:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
   ```
3. Ha a végpont nincs megadva, az alkalmazás **nem szimulál hamis sikert**, hanem barátságos tájékoztatót jelenít meg, és felkínálja a teszteléshez a JSON letöltést és másolást.

---

## 6. Tesztelés Futtatása

A projekt automatizált tesztekkel rendelkezik az adatstruktúra és az alkalmazáslogika ellenőrzésére:

```bash
node tests/app_logic.test.js
```

---

## 7. Licenc & Bibliagaráancia

- **Bibliafordítás:** RÚF 2014 (Revideált új fordítású Biblia, Magyar Bibliatársulat).
- **Pedagógiai háttér:** *Napjaink etikai kihívásai* (2015) – „Etika a kibertérben (internetetika)”.
