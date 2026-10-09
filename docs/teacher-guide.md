# Tanári Útmutató – DIGITÁLIS LELKIISMERET

## 1. A Digitális Tananyag Célja és Háttere

A **DIGITÁLIS LELKIISMERET** egy interaktív, döntésalapú etikai tananyag XII. osztályos (17–18 éves) tanulók számára, a **Református vallás – keresztyén etika** tantárgy *„Etika a kibertérben (internetetika)”* témaköréhez.

Az alkalmazás **nem hagyományos teszt vagy kvíz**: nincs benne pontozás, százalékos értékelés vagy erkölcsi minősítés. A tananyag célja, hogy a diákok valósághű digitális döntéshelyzetekben mérlegeljék tetteik és mulasztásaik lehetséges következményeit.

---

## 2. A Tanóra Felépítése (Javasolt Menetrend: 45 perc)

1. **Bevezetés (5-10 perc):**
   - Tanári indítás: A digitális térben hozott döntéseink és a keresztyén felelősségvállalás összefüggése (1Kor 6,12).
   - A tananyag elérhetősége / megnyitása a diákok eszközein (telefon, tablet, laptop).

2. **Egyéni Döntési Folyamat (15-20 perc):**
   - A diákok önállóan haladnak végig a nyolc döntéshelyzeten.
   - Minden döntés után elolvassák az azonnali és hosszabb távú következményeket, az etikai magyarázatot, a **RÚF 2014** alapú bibliai iránymutatást és a gondolkodtató kérdést.
   - A nyolcadik helyzet után kitöltik a 3 személyes reflexiós kérdést.

3. **Eredmények Exportálása / Beküldése (5 perc):**
   - A diákok letöltik vagy másolják az eredményeiket JSON formátumban (vagy elküldik a tanárnak, ha a beküldési végpont élesítve van).

4. **Közös Feldolgozás és Diszkusszió (10-15 perc):**
   - Osztálytermi beszélgetés a legnehezebb döntésekről (pl. 3. AI használat, 8. AI képgenerálás, 1. Kínos fotó).
   - A megfogalmazott online szabályok összegezése.

---

## 3. A Nyolc Döntéshelyzet Áttekintése

1. **A KÍNOS FOTÓ** – Online megszégyenítés, emberi méltóság, felelősség. (Ef 4,29)
2. **AZ INTERNET NEM FELEJT** – Sértő komment, harag, bűnbánat, jóvátétel. (Mt 5,23–24)
3. **AZ AI MINDENT MEGOLD?** – Mesterséges intelligencia, becsületesség, tanulás. (Péld 12,22)
4. **EGY HÍR, AMELY TÚL HIHETŐ** – Álhírek, igazság, felelős tájékozódás. (2Móz 20,16)
5. **A PRIVÁT ÜZENET** – Bizalom, titoktartás, személyes információk. (Péld 11,13)
6. **A KOMMENTHÁBORÚ** – Hitvallás, szólásszabadság, tisztelet. (1Pt 3,15–16)
7. **CSAK MÉG ÖT PERC!** – Képernyőidő, szabadság, önuralom. (1Kor 6,12)
8. **A MESTERSÉGES ARC** – AI-képek, hamisítás, emberi méltóság. (2Móz 20,16)

---

## 4. Technikai és Adatvédelmi Információk

- **Azonosító:** A játék indításakor egy rövid, anonim munkamenet-azonosító generálódik (pl. `DL-A3X9K2`). Nem gyűjtünk teljes nevet vagy e-mail címet.
- **Helyi Tárolás:** A böngésző frissítésekor a haladás megmarad (`localStorage`).
- **Google Sheets Integráció:** Az alkalmazás közvetlenül elküldi a tanulók anonim eredményeit a tanár Google Sheets táblázatába a megadott Google Apps Script Web App végponton keresztül.

### A Beküldések Ellenőrzése a Google Táblázatban:
1. **Elküldött adatok:** A záróképernyőn az **„Eredmény elküldése a tanárnak”** gomb hatására az alábbi adatok érkeznek meg a táblázatba:
   - **Időpont** (beküldés dátuma és ideje)
   - **Munkamenet ID** (`DL-` azonosító)
   - **Helyzet 1–8** (megerősített A/B/C/D döntések betűi)
   - **Reflexiós válaszok** (Q1, Q2, Q3 kérdésekre adott válaszok)
2. **Duplikáció-szűrés:** Az ismételt beküldési kísérletek ugyanazt a `munkamenet_azonosito`-t használják. Ha a táblázatban már létezik a bejegyzés, az Apps Script visszajelzi, hogy az adat korábban már beérkezett, megelőzve a duplikátumokat.
3. **Ellenőrzési lépések:**
   - Nyisd meg a játék záróképernyőjét.
   - Note-old le a munkamenet azonosítót (pl. `DL-TEST02`).
   - Kattints az **„Eredmény elküldése a tanárnak”** gombra.
   - Ellenőrizd a csatolt Google Sheets táblázat legutolsó sorát, amelyben meg kell jelennie az adott munkamenet azonosítónak, döntéseknek és válaszoknak.

---

## 5. Beágyazás LIVRESQ Digitális Tananyagba

Az alkalmazás tiszta HTML/CSS/JS megvalósítású, HTTPS protokollon futtatható (pl. GitHub Pages), így közvetlenül beágyazható `iframe` elemként LIVRESQ tananyagba:

```html
<iframe src="https://<USER>.github.io/Digitalis-Lelkiismeret/"
        width="100%"
        height="800px"
        style="border:none; border-radius:12px;"
        allowfullscreen>
</iframe>
```
