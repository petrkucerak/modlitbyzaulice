# Modlitby za ulice

Web application for project `Modlitby za ulice`.

Projekt není hotovým řešením, jedná se pouze o DEMO.

## O projektu

Jednoduchá webová aplikace, která slouží k zobrazování promodlených ulic v Pardubicích.

Aplikace si klade tyto cíle:

- aby fungovala na všech typech zařízení z uživatelského pohledu – responzivita
- aby šla provozovat zadarmo nebo za minimální cenu

Samotný návrh aplikace se skládá ze 3 části (v DEMO verzi i 3 stránek):

| část               | popis                                                                         | url                                                 |
| ------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------- |
| úvodní stránky     | vysvětlen smysl, jak celý projekt funguje a jak se do něho může každý zapojit | [/](https://modlitbazapardubice.pages.dev/)         |
| mapa               | vizualizace již promodlených ulic                                             | [/mapa](https://modlitbazapardubice.pages.dev/mapa) |
| redakční prostředí | možnost editace již promodlených ulic                                         | [/form](https://modlitbazapardubice.pages.dev/form) |

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

## Dataset

Dataset je generován pomocí skriptu `parse_data.py`, který je umístěný ve složce `/data`. Skript jako vstup bere:

- Soubory exportovaného z **RÚIOAN** pomocí [standardního výměnného formátu](https://vdp.cuzk.cz/vdp/ruian/vymennyformat) ve formátu _xml_. Pro export je třeba zvolit
  | název | parametr |
  | -------------- | ---------------------------------------------------- |
  | Časový rozsah | Úplná kopie |
  | Územní prvky | Obec a podřazené |
  | Datová sada | Kompletní |
  | Výběr z údajů | `Gen. hranice` `Originální hranice` `Vlajky a znaky` |
  | Územní omezení | Obec _vyhledávejte konrkétní obce_ |

  Tyto soubory umistě do složky `/data`. Skript si je automaticky vyhledá.

  > **Pozor**: ne všechny obce (zvláště malé) mají ulice. V takové případě vám tento soubor a skript nijako nepomůže a je je třeba zadat manuálně.

- JSON soubor s názvem `manual_data.json`, který musí být umístěn v složce `/data`. Struktura souboru je stejná jako u výstupu dat. Navíc je možnost místo objektu `coordinates` (vykresluje přímku znázorňující ulici včetně přerušení ulice) použít objekt `polygon`, který ohraničí daný objet do polygonu.

Výstupem skriptu jsou 2 soubory:

- `streets_data.json` exportovaná data
- `streets_with_coordinates.js` exportovaná data přirazená do proměnné urychlující kompilaci

Výstupní JSON soubor má strukturu:

| název                     | typ                                                   | popis                                                                                                                                                                                                                                                                                                                |
| ------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                    | `string`                                              | Jména těch, kteří se modlili za danou ulici. Tota data se naplňují dynamicky přes redakční formulář v průběhu akce.                                                                                                                                                                                                  |
| `street_name`             | `string`                                              | Název ulice či významného objetku. Zobrazuje se na kartičkách a na webu jako hlavní identifikátor. Každý obkjekt musí mít tuto hodnotu vyplněnou.                                                                                                                                                                    |
| `city_name`               | `string`                                              | Název města. Jedná se o nepovidnný údaj, který nemá žádné funkční využití v momentální implementaci. Slouží pouze pro lepší konzistenci dat.                                                                                                                                                                         |
| `district_name`           | `string`                                              | Název části obce je povinnou položkou, pokud existuje. Zobrazuje se na webu i na kartičkách a pomáhá identifikovat přesněji daný objekt. _Pokud ulice leží ve více částech, skript dá přednost té první._                                                                                                            |
| `color`                   | `string`                                              | Kód pro barvu je povinný. Po promodlení, tedy pokud není proměnná `name` prázdná, zobrazuje danou barvu na webu. Barva je vždy společná pro danou část obce `district_name`. Je možné nastavit fixní barvy, jinak budou přiřazeny náhodně při spuštění skriptu z barvné nabídky, která vychází z grafického manuálu. |
| `unique_number`           | `number`                                              | Generované sekvenčně automaticky a slouží k identifikaci kartičky. Číslo je vždy 4 místné a začíná od hodnoty _1100_.                                                                                                                                                                                                |
| `coordinates` / `polygon` | `array` of `arrays` of `coords` / `array` of `coords` | Obsahuje údaje, které vykreslí na mapě čáru či polygon. Pro čáru je nutné zadat pole polí souřadnic a to z toho důvodu, že ulice může být přerušena. Pro polygon pole souřadnic. **Souřadnice** (`coords`) je pole o dvou prvcích. Tato hodnota je povinná, resp. bez ní se nevykreslí daný objekt na mapě.          |

## Generování kartiček
