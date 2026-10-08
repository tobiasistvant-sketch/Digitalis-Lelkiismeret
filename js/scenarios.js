/**
 * DIGITÁLIS LELKIISMERET - Scenarios & Choices Data Module
 * RÚF 2014 Bible references and ethical guidance included.
 */

const SCENARIOS = [
  {
    id: 1,
    title: "A KÍNOS FOTÓ",
    theme: "Online megszégyenítés, emberi méltóság, felelősség.",
    visualType: "chat_group",
    story: "Az osztálycsoportban valaki megoszt egy kínos fényképet Mátéról. A kép egy iskolai rendezvényen készült, amikor Máté kellemetlen helyzetbe került.\n\nNéhányan nevetnek, valaki mémként szerkeszti tovább. A kép már egy másik csoportba is eljutott.\n\nLilla új üzenetet küld:\n„Na, ki küldi tovább? 😂”",
    question: "Te mit tennél?",
    chatMessages: [
      { sender: "Péter", avatar: "P", text: "Haha nézzétek meg ezt! 😂", time: "14:22" },
      { sender: "MémGen", avatar: "M", text: "[Kép csatolva: Máté_mém_v1.jpg]", time: "14:23" },
      { sender: "Lilla", avatar: "L", text: "Na, ki küldi tovább? 😂", time: "14:25", isKey: true }
    ],
    choices: {
      A: {
        letter: "A",
        label: "Továbbküldöm. Ez csak egy vicces kép.",
        shortTitle: "Kép továbbküldése",
        immediate: "A kép újabb csoportba jut. Többen nevetnek rajta, és valaki újabb változatot készít belőle.",
        longTerm: "Máté megtudhatja, hogy te is részt vettél a terjesztésben. Megszégyenítve érezheti magát, és a köztetek lévő bizalom megsérülhet.",
        ethics: "A szórakozás nem írja felül a másik ember méltóságát. A továbbküldés is aktív részvétel, akkor is, ha nem te készítetted az eredeti képet.",
        biblicalGuidance: "Ef 4,29 – Beszédünk és kommunikációnk a másik ember épülését szolgálja.",
        question: "Attól, hogy nem te készítetted a képet, kisebb a felelősséged?"
      },
      B: {
        letter: "B",
        label: "Nem küldöm tovább, de nem is szólok.",
        shortTitle: "Csendes kimaradás",
        immediate: "Nem járulsz hozzá közvetlenül a terjedéshez, de a csoportban folytatódhat a gúnyolódás.",
        longTerm: "Máté segítség nélkül maradhat. Ugyanakkor elképzelhető, hogy a nyilvános fellépést nem érzed biztonságosnak.",
        ethics: "A hallgatás és az óvatosság nem mindig ugyanaz. A segítségnyújtásnak több módja létezik, és nem minden helyzetben a nyilvános konfrontáció a legjobb megoldás.",
        biblicalGuidance: "Péld 31,8–9 – Kiállás azok mellett, akiknek védelemre van szükségük.",
        question: "Hogyan segíthetnél anélkül, hogy nyilvános vitába keverednél?"
      },
      C: {
        letter: "C",
        label: "Megkérem a többieket, hogy töröljék.",
        shortTitle: "Nyilvános kiállás",
        immediate: "Néhányan abbahagyhatják a nevetést. Mások azzal vádolhatnak, hogy túl komolyan veszed a helyzetet.",
        longTerm: "Sikerülhet megállítani a további terjedést, de a már elküldött másolatok nem feltétlenül tűnnek el.",
        ethics: "A másik ember melletti kiállás bátorságot igényelhet. Egy döntés erkölcsi értéke nem kizárólag azon múlik, hogy azonnal sikeres lesz-e.",
        biblicalGuidance: "Péld 24,11–12 – Felelősség azokért, akik veszélybe kerültek.",
        question: "Mit tennél, ha a többiek kinevetnének a kiállásod miatt?"
      },
      D: {
        letter: "D",
        label: "Privátban megkérdezem Mátét, segíthetek-e.",
        shortTitle: "Személyes támogatás",
        immediate: "Máté megtudja, hogy nincs egyedül. Elmondhatja, mire lenne szüksége.",
        longTerm: "A támogatás erősítheti a bizalmat, de a kép terjedésének megállításához további lépésekre lehet szükség.",
        ethics: "Az együttérzés és a másik ember akaratának tisztelete fontos. A segítség akkor igazán hasznos, ha figyelünk arra is, mire van szüksége az érintettnek.",
        biblicalGuidance: "Róm 12,15 – Együttérzés az örülőkkel és a sírókkal.",
        question: "Mit tehetnél, ha Máté azt kéri, hogy ne avatkozz bele?"
      }
    }
  },
  {
    id: 2,
    title: "AZ INTERNET NEM FELEJT",
    theme: "Sértő komment, harag, bűnbánat, jóvátétel.",
    visualType: "social_post_comments",
    story: "Egy nyilvános bejegyzés alatt heves vitába keveredtél egy ismerősöddel. Dühödben személyeskedő, sértő kommentet írtál.\n\nMásnap már megbántad, amit mondtál.\n\nA hozzászólásról azonban valaki képernyőképet készített, és több ismerősöd is látta.",
    question: "Mit teszel most?",
    choices: {
      A: {
        letter: "A",
        label: "Törlöm a kommentet, és úgy teszek, mintha semmi sem történt volna.",
        shortTitle: "Törlés magyarázat nélkül",
        immediate: "A komment eltűnik az eredeti felületről, de a képernyőkép megmaradhat.",
        longTerm: "A sértett fél úgy érezheti, hogy nem vállaltál felelősséget. A konfliktus lezáratlan maradhat.",
        ethics: "A káros tartalom eltávolítása fontos lépés, de a törlés önmagában nem feltétlenül jelent jóvátételt.",
        biblicalGuidance: "Mt 5,23–24 – A megbékélés keresésének fontossága.",
        question: "Elég eltüntetni egy sértő mondatot, ha a sérelem már megtörtént?"
      },
      B: {
        letter: "B",
        label: "Megmagyarázom, hogy ideges voltam, és ezért írtam.",
        shortTitle: "Indoklás és körülmények",
        immediate: "A többiek megismerhetik a körülményeket, de a magyarázat könnyen mentegetőzésnek tűnhet.",
        longTerm: "Ha csak a saját indulatodat hangsúlyozod, a sértett fél úgy érezheti, hogy nem érted meg az ő helyzetét.",
        ethics: "Az indulat magyarázhat egy viselkedést, de nem feltétlenül menti fel az embert a felelősség alól.",
        biblicalGuidance: "Jak 1,19–20 – A meghallgatás, a megfontolt beszéd és az indulat kérdése.",
        question: "Mi a különbség a magyarázat és a kifogás között?"
      },
      C: {
        letter: "C",
        label: "Bocsánatot kérek, és vállalom a felelősséget.",
        shortTitle: "Bocsánatkérés és felelősség",
        immediate: "A másik fél láthatja, hogy felismerted a hibádat. Elképzelhető azonban, hogy nem fogadja el azonnal a bocsánatkérést.",
        longTerm: "A kapcsolat helyreállhat, de a bizalom újjáépítéséhez időre és következetes viselkedésre lehet szükség.",
        ethics: "A bűnbánat több a sajnálkozásnál: a felelősség elismerését és a változtatás szándékát is magában foglalja.",
        biblicalGuidance: "Ef 4,32 – Egymás iránti jóság és megbocsátás.",
        question: "Mitől lesz hiteles egy online bocsánatkérés?"
      },
      D: {
        letter: "D",
        label: "Visszatámadok, mert engem is megsértettek.",
        shortTitle: "Visszatámadás",
        immediate: "A vita újra fellángolhat. Mások is bekapcsolódhatnak, és a konfliktus egyre személyesebbé válhat.",
        longTerm: "Mindkét fél elveszítheti az ellenőrzést a vita felett. A sértő hozzászólások később is előkerülhetnek.",
        ethics: "Az elszenvedett sérelem nem tesz automatikusan elfogadhatóvá minden válaszreakciót.",
        biblicalGuidance: "Róm 12,17–18 – Ne fizessünk rosszal a rosszért; törekedjünk a békességre.",
        question: "Hogyan lehet megvédeni magunkat anélkül, hogy ugyanazt tennénk, amit sérelmezünk?"
      }
    }
  },
  {
    id: 3,
    title: "AZ AI MINDENT MEGOLD?",
    theme: "Mesterséges intelligencia, becsületesség, tanulás, felelősség.",
    visualType: "ai_chat_editor",
    story: "Holnapig be kell adnod egy fontos iskolai dolgozatot. Már késő este van, és alig haladtál.\n\nMegnyitsz egy mesterségesintelligencia-alkalmazást, amely néhány másodperc alatt teljes dolgozatot készít.\n\nA feladat kiírása nem részletezi pontosan, milyen AI-használat megengedett.",
    question: "Hogyan használod az elkészült szöveget?",
    choices: {
      A: {
        letter: "A",
        label: "Változtatás nélkül beadom saját munkámként.",
        shortTitle: "Teljes AI szöveg beadása",
        immediate: "Időt takarítasz meg, és látszólag teljesíted a feladatot.",
        longTerm: "A dolgozat nem feltétlenül tükrözi a tudásodat. Ha meg kell védened az állításait, nehéz helyzetbe kerülhetsz. A szöveg tévedéseket is tartalmazhat.",
        ethics: "A probléma nem pusztán az AI használata, hanem az, ha egy gép által készített teljesítményt megtévesztően sajátként mutatod be.",
        biblicalGuidance: "Péld 12,22 – Az igazmondás és a becsületesség értéke.",
        question: "Miért készíttet a tanár beadandót: csak a kész szövegért vagy a tanulási folyamatért is?"
      },
      B: {
        letter: "B",
        label: "Átírok néhány mondatot, hogy ne tűnjön fel.",
        shortTitle: "Felületes átírás",
        immediate: "A szöveg külsőleg egyedibbnek tűnik.",
        longTerm: "A feladat lényegi részét továbbra sem feltétlenül te végezted el. A felületes átírás a hibákat is megőrizheti.",
        ethics: "A megtévesztés szándékát nem szünteti meg néhány mondat átfogalmazása.",
        biblicalGuidance: "Lk 16,10 – Hűség és megbízhatóság a kisebb dolgokban is.",
        question: "Attól válik-e saját munkává egy szöveg, hogy megváltoztatunk benne néhány szót?"
      },
      C: {
        letter: "C",
        label: "Ötletgyűjtésre használom, de magam dolgozom ki.",
        shortTitle: "Ötletgyűjtés és önálló átdolgozás",
        immediate: "Gyorsabban találhatsz szempontokat, miközben a gondolatmenetet magad alakítod ki.",
        longTerm: "Fejlődhet az önálló munkád, ha ellenőrzöd a forrásokat, és valóban megérted a tartalmat.",
        ethics: "A technológia segítséget adhat a tanuláshoz. A felelős használathoz azonban a feladat szabályainak tisztelete és az AI-közreműködés megfelelő jelzése is hozzátartozik.",
        biblicalGuidance: "1Kor 10,23 – Nem minden hasznos, ami önmagában megengedett.",
        question: "Hol húznád meg a határt a segítség és a helyetted végzett munka között?"
      },
      D: {
        letter: "D",
        label: "Megkérdezem a tanárt, milyen AI-használat megengedett.",
        shortTitle: "Szabályok tisztázása a tanárral",
        immediate: "Lehet, hogy várnod kell a válaszra, és kevesebb időd marad.",
        longTerm: "Tisztábbá válhatnak a szabályok. Ha nem érkezik válasz, továbbra is a rendelkezésre álló útmutatások alapján kell felelősen döntened.",
        ethics: "A bizonytalan szabályok tisztázása a becsületesség része. A felelősséget azonban nem lehet teljesen másra hárítani.",
        biblicalGuidance: "Péld 15,22 – A tanácskérés és a megfontolt tervezés értéke.",
        question: "Mit tennél, ha a tanár már nem válaszolna a beadási határidő előtt?"
      }
    }
  },
  {
    id: 4,
    title: "EGY HÍR, AMELY TÚL HIHETŐ",
    theme: "Álhírek, igazság, felelős tájékozódás.",
    visualType: "news_feed",
    story: "Egy ismerősöd megoszt egy felháborító hírt. A bejegyzés szerint egy ismert intézmény súlyos visszaélést követett el.\n\nA poszt több ezer reakciót kapott, és sokan követelik, hogy mindenki ossza tovább.\n\nA bejegyzésben nincs ellenőrizhető forrás.",
    question: "Mit teszel?",
    choices: {
      A: {
        letter: "A",
        label: "Megosztom, mert fontosnak tűnik.",
        shortTitle: "Azonnali megosztás",
        immediate: "A hír újabb emberekhez jut el. Ismerőseid közül többen hitelesnek tekinthetik, mert tőled látták.",
        longTerm: "Ha a hír hamis vagy félrevezető, hozzájárulhatsz a tévedés és az indulatok terjedéséhez.",
        ethics: "A jó szándék nem helyettesíti az ellenőrzést. A továbbadott információért is felelősséget viselünk.",
        biblicalGuidance: "2Móz 20,16 – A hamis tanúskodás tilalma.",
        question: "Megosztanál-e egy állítást, ha nem tudnád bizonyítani, hogy igaz?"
      },
      B: {
        letter: "B",
        label: "A kommentek alapján döntöm el, hogy igaz-e.",
        shortTitle: "Döntés kommentek alapján",
        immediate: "Sok véleménnyel találkozol, de ezek nem feltétlenül független bizonyítékok.",
        longTerm: "A népszerű vélemény könnyen megerősítheti a téves információt.",
        ethics: "A többség véleménye nem azonos a bizonyított igazsággal.",
        biblicalGuidance: "1Thessz 5,21 – Mindent vizsgáljunk meg, és a jót tartsuk meg.",
        question: "Lehet-e valami hamis akkor is, ha tízezren egyetértenek vele?"
      },
      C: {
        letter: "C",
        label: "Megbízható forrásokból ellenőrzöm.",
        shortTitle: "Forrásellenőrzés",
        immediate: "Időt fordítasz a hír eredetének, dátumának és bizonyítékainak vizsgálatára.",
        longTerm: "Megalapozottabb véleményt alkothatsz. Az is előfordulhat, hogy nem találsz elegendő információt a biztos következtetéshez.",
        ethics: "A felelős tájékozódás része annak felismerése is, amikor még nem tudunk eleget.",
        biblicalGuidance: "Péld 18,13 – Az elhamarkodott ítélet veszélye.",
        question: "Mit tennél, ha az ellenőrzés után sem tudnád eldönteni, igaz-e a hír?"
      },
      D: {
        letter: "D",
        label: "Megkérdezem az ismerősömet, honnan származik.",
        shortTitle: "Rákérdezés az ismerősnél",
        immediate: "Lehetőséget adsz neki a forrás megjelölésére. Kiderülhet, hogy ő is csak mástól vette át.",
        longTerm: "A beszélgetés segítheti a tudatosabb megosztást, de a kapott forrást külön is ellenőrizni kell.",
        ethics: "A kérdezés felelősebb lehet, mint az azonnali megosztás vagy vádaskodás.",
        biblicalGuidance: "Jak 1,19 – Legyünk készek a meghallgatásra.",
        question: "Hogyan kérdeznél rá egy hír hitelességére úgy, hogy ne sértsd meg az ismerősödet?"
      }
    }
  },
  {
    id: 5,
    title: "A PRIVÁT ÜZENET",
    theme: "Bizalom, titoktartás, személyes információk.",
    visualType: "private_chat",
    story: "Egy közeli barátod személyes családi problémájáról ír neked. Megkér, hogy a beszélgetést kezeld bizalmasan.\n\nMásnap egy közös ismerősötök észreveszi, hogy valami történt, és arra kér, mutasd meg neki az üzeneteket.",
    question: "Hogyan reagálsz?",
    choices: {
      A: {
        letter: "A",
        label: "Átküldöm a beszélgetést, hiszen ő is a barátunk.",
        shortTitle: "Üzenet továbbküldése",
        immediate: "A harmadik személy megismeri a bizalmas részleteket.",
        longTerm: "A barátod elveszítheti a bizalmát benned. Az üzenetek további terjedését sem tudod teljesen ellenőrizni.",
        ethics: "A közös barátság önmagában nem jogosít fel bizalmas információk továbbadására.",
        biblicalGuidance: "Péld 11,13 – A titoktartás és a megbízhatóság értéke.",
        question: "Kinek van joga eldönteni, ki ismerheti meg a személyes történetét?"
      },
      B: {
        letter: "B",
        label: "Elmesélem a lényeget, de neveket nem említek.",
        shortTitle: "Névtelen összefoglaló",
        immediate: "Úgy érezheted, hogy megőrizted a titkot, miközben a történet lényegét továbbadtad.",
        longTerm: "A körülményekből az érintett személy felismerhető lehet.",
        ethics: "A név elhagyása nem minden esetben jelent valódi anonimitást vagy titoktartást.",
        biblicalGuidance: "Péld 20,19 – Az indiszkrét beszéd veszélye.",
        question: "Ha valaki a részletekből felismerhető, valóban megőrizted a titkát?"
      },
      C: {
        letter: "C",
        label: "Nem adom tovább az üzenetet.",
        shortTitle: "Megőrzött titok",
        immediate: "Megőrzöd a rád bízott információt.",
        longTerm: "Erősödhet a bizalom. Ha azonban a beszélgetés közvetlen veszélyre vagy súlyos bántalmazásra utalna, indokolt lehet megfelelő segítséget kérni.",
        ethics: "A titoktartás fontos erkölcsi kötelesség, de nem abszolút, ha valakinek a biztonsága forog kockán.",
        biblicalGuidance: "Péld 11,13 – A megbízható ember megőrzi a rábízott titkot.",
        question: "Mikor lehet fontosabb valakinek a biztonsága, mint a titoktartás?"
      },
      D: {
        letter: "D",
        label: "Megkérdezem a barátomat, mit oszthatok meg.",
        shortTitle: "Egyeztetés az érintettel",
        immediate: "A barátod maga dönthet arról, hogy a személyes történetéből mit szeretne másokkal közölni.",
        longTerm: "Megmaradhat a bizalom, és lehetőség nyílhat közös segítségkérésre.",
        ethics: "A beleegyezés tiszteletben tartja a másik ember önrendelkezését. Súlyos veszély esetén azonban a segítségkérés külön mérlegelést igényel.",
        biblicalGuidance: "Mt 7,12 – Úgy bánjunk másokkal, ahogyan szeretnénk, hogy velünk bánjanak.",
        question: "Te mit várnál el attól, akinek bizalmas üzenetet küldesz?"
      }
    }
  },
  {
    id: 6,
    title: "A KOMMENTHÁBORÚ",
    theme: "Hitvallás, szólásszabadság, tisztelet, vallási véleménykülönbség.",
    visualType: "public_debate",
    story: "Egy közösségi oldalon valaki gúnyos megjegyzést tesz a keresztyén hitre.\n\nTöbben csatlakoznak a vitához. Egyesek egyszerűen nem értenek egyet a vallásos világnézettel, mások személyeskedő, sértő megjegyzéseket írnak.\n\nEgy hozzászóló téged is megszólít:\n„Na, erre mit mondasz, ha olyan nagy hívő vagy?”",
    question: "Hogyan reagálsz?",
    choices: {
      A: {
        letter: "A",
        label: "Hasonló hangnemben visszavágok.",
        shortTitle: "Támadó visszavágás",
        immediate: "A vita élesebbé válhat, és a figyelem a személyeskedésre terelődik.",
        longTerm: "A hozzászólásaid alapján mások is véleményt alkothatnak rólad és arról, hogyan képviseled a hitedet.",
        ethics: "A hitünk védelme nem követeli meg mások megalázását. A kommunikáció módja maga is üzenetet hordoz.",
        biblicalGuidance: "1Pt 3,15–16 – A hitről szelídséggel és tisztelettel való számadás.",
        question: "Lehet-e igazad egy vitában, miközben a viselkedésed mégis helytelen?"
      },
      B: {
        letter: "B",
        label: "Kulturáltan megfogalmazom, miért nem értek egyet.",
        shortTitle: "Tiszteletteljes válasz",
        immediate: "Világosan képviselheted a meggyőződésedet, bár nem biztos, hogy a másik fél elfogadja az érveidet.",
        longTerm: "A tiszteletteljes párbeszéd lehetőséget adhat a kölcsönös megértésre.",
        ethics: "A hitvallás és a másik ember tisztelete nem zárja ki egymást.",
        biblicalGuidance: "Kol 4,6 – Beszédünk legyen kedves és megfontolt.",
        question: "Hogyan mondhatod el a meggyőződésedet úgy, hogy közben valóban meghallgatod a másikat?"
      },
      C: {
        letter: "C",
        label: "Nem reagálok, mert nem minden vitába érdemes belemenni.",
        shortTitle: "Csendes visszahúzódás",
        immediate: "Nem kapcsolódsz be a konfliktusba, így nem növeled annak hevességét.",
        longTerm: "Megőrizheted a nyugalmadat, de el is szalaszthatsz egy értelmes párbeszédre alkalmas lehetőséget.",
        ethics: "A hallgatás nem feltétlenül gyávaság. A bölcs mérlegelés része annak felismerése, mikor érdemes megszólalni.",
        biblicalGuidance: "Préd 3,7 – Ideje van a hallgatásnak és ideje a beszédnek.",
        question: "Mikor jelent bölcsességet a hallgatás, és mikor lenne fontos megszólalni?"
      },
      D: {
        letter: "D",
        label: "Jelentem a hozzászólást, ha zaklató vagy gyűlöletkeltő.",
        shortTitle: "Bejelentés a platformon",
        immediate: "A platform megvizsgálhatja a bejelentést, de nem biztos, hogy eltávolítja a tartalmat.",
        longTerm: "Indokolt esetben csökkenhet a zaklatás. Ugyanakkor a puszta valláskritika vagy véleménykülönbség nem azonos a gyűlöletkeltéssel.",
        ethics: "A másik ember véleménynyilvánítási szabadságát akkor is tiszteletben kell tartani, ha nem értünk vele egyet. A zaklatás elleni fellépés ettől különböző kérdés.",
        biblicalGuidance: "Róm 12,18 – Amennyire rajtunk áll, törekedjünk a békességre.",
        question: "Hogyan különböztetnéd meg a sértőnek érzett véleményt a tényleges zaklatástól?"
      }
    }
  },
  {
    id: 7,
    title: "CSAK MÉG ÖT PERC!",
    theme: "Képernyőidő, szabadság, önuralom, digitális szokások.",
    visualType: "late_night_feed",
    story: "Éjfél után jár az idő (00:17).\n\nMásnap fontos dolgozatot írsz. Már rég le kellett volna feküdnöd, de a közösségi alkalmazás folyamatosan újabb érdekes videókat ajánl.\n\nA következő videó csak 40 másodperces.\n\nA képernyőn megjelenik az üzenet:\n„Ezt még látnod kell!”",
    question: "Mit teszel?",
    choices: {
      A: {
        letter: "A",
        label: "Még megnézek néhány videót.",
        shortTitle: "További videók nézése",
        immediate: "Jól szórakozol, és rövid ideig kikapcsolódsz.",
        longTerm: "A tervezettnél később aludhatsz el, ami ronthatja a másnapi koncentrációdat.",
        ethics: "A szórakozás önmagában nem rossz. A kérdés az, hogy tudatosan döntesz-e róla, vagy a szokásaid irányítanak.",
        biblicalGuidance: "1Kor 6,12 – A szabadság és a függőség kérdése.",
        question: "Mikor válik egy kellemes időtöltés nehezen irányítható szokássá?"
      },
      B: {
        letter: "B",
        label: "Beállítok egy rövid időkorlátot.",
        shortTitle: "Időkorlát beállítása",
        immediate: "Megpróbálod tudatosan korlátozni a telefonhasználatodat.",
        longTerm: "Az időkorlát segíthet az önszabályozásban, ha valóban betartod.",
        ethics: "Az önuralom nem feltétlenül jelent teljes lemondást. Sokszor tudatos határok kialakítását jelenti.",
        biblicalGuidance: "Gal 5,22–23 – A Lélek gyümölcsei között szereplő mértékletesség.",
        question: "Mitől működik egy saját magadnak felállított szabály?"
      },
      C: {
        letter: "C",
        label: "Leteszem a telefont, és lefekszem.",
        shortTitle: "Azonnali elalvási döntés",
        immediate: "Lemondasz a további videókról, és időt biztosítasz a pihenésre.",
        longTerm: "A tudatos döntés segítheti az egészségesebb alvási szokásokat.",
        ethics: "A szabadság része az is, hogy nemet tudunk mondani valamire, amit egyébként élvezünk.",
        biblicalGuidance: "1Kor 6,12 – Nem válok semminek a rabjává.",
        question: "Miért lehet nehezebb abbahagyni valamit, mint elkezdeni?"
      },
      D: {
        letter: "D",
        label: "Kikapcsolom az értesítéseket, de folytatom a böngészést.",
        shortTitle: "Értesítések kikapcsolása",
        immediate: "Kevesebb külső értesítés zavar, de továbbra is új tartalmakat nézel.",
        longTerm: "Csökkenhet a megszakítások száma, de a videófolyam továbbra is lekötheti a figyelmedet.",
        ethics: "A digitális szokások alakításához nem mindig elegendő egy technikai beállítás. Saját döntéseinket is meg kell vizsgálnunk.",
        biblicalGuidance: "Péld 25,28 – Az önuralom hiányának következményei.",
        question: "Mi irányítja most a figyelmedet: te magad vagy az alkalmazás?"
      }
    }
  },
  {
    id: 8,
    title: "A MESTERSÉGES ARC",
    theme: "AI-képek, hamisítás, emberi méltóság, felelősség.",
    visualType: "ai_generator",
    story: "Egy ismerősöd mesterséges intelligenciával képet készített az egyik tanárotokról.\n\nA kép nem valódi fénykép, de rendkívül élethű. A tanárt megalázó helyzetben ábrázolja.\n\nAz ismerősöd ezt írja:\n„Ez zseniális! Küldd tovább, hadd lássa mindenki!”",
    question: "Hogyan döntesz?",
    choices: {
      A: {
        letter: "A",
        label: "Megosztom, hiszen nem valódi fénykép.",
        shortTitle: "AI kép megosztása",
        immediate: "A kép több emberhez jut el. Egyesek viccként kezelik, mások valódi felvételnek hihetik.",
        longTerm: "Az érintett személy hírneve és méltósága sérülhet, a kép eredete pedig elhomályosulhat.",
        ethics: "Egy kép attól még okozhat valódi sérelmet, hogy mesterségesen készült.",
        biblicalGuidance: "2Móz 20,16 – A másik emberről terjesztett hamis állítás felelőssége.",
        question: "Megszűnik-e a felelősségünk, ha egy sértő tartalom nem valódi?"
      },
      B: {
        letter: "B",
        label: "Nem osztom meg, de megtartom.",
        shortTitle: "Kép megtartása megosztás nélkül",
        immediate: "Nem járulsz hozzá a kép további terjesztéséhez.",
        longTerm: "A kép a birtokodban marad, és később ismét előkerülhet. A megtartás célja és a későbbi felhasználás is számít.",
        ethics: "A nem-megosztás fontos döntés, de érdemes azt is mérlegelni, szükséges-e megőrizni egy megalázó tartalmat.",
        biblicalGuidance: "1Kor 10,23 – Nem minden épít, ami megtehető.",
        question: "Van-e különbség egy sértő kép bizonyítékként való megőrzése és szórakozásból történő tárolása között?"
      },
      C: {
        letter: "C",
        label: "Elmagyarázom, miért lehet ez káros.",
        shortTitle: "Káros következmények elmagyarázása",
        immediate: "Az ismerősöd szembesülhet azzal, hogy a kép másnak valódi fájdalmat okozhat.",
        longTerm: "Lehet, hogy átgondolja a tettét, de az is elképzelhető, hogy nem ért egyet veled.",
        ethics: "A felelős fellépés nem feltétlenül büntetéssel kezdődik. A párbeszéd és a következmények tudatosítása is fontos.",
        biblicalGuidance: "Ef 4,15 – Az igazság szeretetben történő képviselete.",
        question: "Hogyan magyaráznád el egy barátodnak, hogy egy viccnek szánt AI-kép is árthat?"
      },
      D: {
        letter: "D",
        label: "Ha a kép súlyosan sértő, jelzem az illetékesnek.",
        shortTitle: "Jelzés az illetékesnek",
        immediate: "Egy felelős személy vagy az érintett platform megvizsgálhatja a helyzetet.",
        longTerm: "Segítség nyílhat a káros tartalom eltávolítására és az érintett védelmére, de a beavatkozásnak arányosnak kell lennie.",
        ethics: "A segítségkérés nem feltétlenül árulkodás. Fontos azonban a tények pontos bemutatása és az indokolatlan nyilvánosság kerülése.",
        biblicalGuidance: "Péld 31,8–9 – A kiszolgáltatott ember védelme.",
        question: "Mikor elegendő egy baráti figyelmeztetés, és mikor szükséges felelős személy segítségét kérni?"
      }
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SCENARIOS };
} else {
  window.SCENARIOS = SCENARIOS;
}
