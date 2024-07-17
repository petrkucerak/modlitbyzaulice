# Modlitby za Pardubice

Web application for project `Modlitby za Pardubice`.

Projekt není hotovým řešením, jedná se pouze o DEMO.


## O projektu

Jednoduchá webová aplikace, která slouží k zobrazování promodlených ulic v Pardubicích.

Aplikace si klade tyto cíle:
- aby fungovala na všech typech zařízení z uživatelského pohledu – responzivita
- aby šla provozovat zadarmo nebo za minimální cenu

Samotný návrh aplikace se skládá ze 3 části (v DEMO verzi i 3 stránek):
1.	úvodní stránky – na ní by měl být vysvětlen smysl, jak celý projekt funguje a jak se do něho může každý zapojit
2.	mapa – vizualizace již promodlených ulic
3.	redakční prostředí – možnost editace již promodlených ulic

### Úvodní stránka

Samotná prezentace, která by měla:
- zaujmout
- odprezentovat myšlenku
- vysvětlit, jak projekt funguje
- dát info, jak se do projektu může zapojit každý

### Mapa

Mapa slouží k vizualizaci toho, za jaké ulice se již někdo modlil. Souřadnice ulic jsou získána pomocí overpass api, které běží na OpenStreetMaps. Kvůli ušetření výpočetní náročnosti a finančních nákladů jsou data předpočítána (viz python skript ve složce data) a uložena přímo v kódu.

Pro zvýšení iteraci se promodlené ulice vykreslují se zpožděním. Po rozkliknutí promodlené ulice se zobrazí její název, datum, kdy byla promodlena a přezdívka toho, kdo se za ni modlil.

Mapa běží na mapovém podkladu mapy.cz díky open-source API pricing option.

### Redakční prostředí
Kvůli ušetření finančních prostředků běží celý systém staticky bez jakékoliv databáze. Editace tedy probíhá v prohlížeči administrátora. Ten si pak upravený soubor musí stáhnout a nahrát do repozitáře.
