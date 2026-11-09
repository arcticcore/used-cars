# Svenska begagnatbilar kring 100 000 kr

Ett öppet kunskapsprojekt för svenska begagnatmarknaden: motorvarianter, dokumenterade brister och kontrollpunkter inför köp. Målbudgeten är cirka 100 000 kronor, inte ett verifierat marknadspris eller en köprekommendation.

**Webbplats:** [Begagnat / 100](https://arcticcore.github.io/used-cars/), byggd med Astro och TypeScript, automatiskt publicerad via GitHub Pages. Range Rover L322 (2012) och Golf VII med motoröversikt samt Golf VI, BMW 3-serie E90/E91 och Toyota Yaris XP130 visas i en separat förhandsvisning som researchutkast. Inga tekniska biluppgifter är ännu granskade.

- [Plan för webbplatsen](docs/PLAN.md)
- [Bidra med en bilmodell eller rättelse](CONTRIBUTING.md)
- [Dataformat och publiceringsregler](docs/DATA.md)
- [AI-skill för bildata](.agents/skills/car-data/SKILL.md)

## Kom igång

Python 3.12 eller senare:

```sh
git clone https://github.com/arcticcore/used-cars.git
cd used-cars
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements-dev.txt
python scripts/validate_data.py
python -m unittest discover -s tests
```

Alla kan föreslå ändringar genom forks och pull requests eller öppna ett issue. AI krävs inte. Pull requests kör datavalidering; en människa granskar faktaunderlaget innan innehåll markeras som granskat.

## Transparens

Varje datapost anger ursprung, genereringsdatum, AI-leverantör och exakt modell när den är känd, samt eventuell granskare och granskningsdatum. Okänd modell anges som `null`, aldrig som ett gissat modellnamn. Sådana AI-utkast får inte markeras som granskade innan modelluppgiften kan styrkas eller innehållet har ersatts med ett nytt spårbart underlag.

Innehållet är allmän information och kan vara ofullständigt eller inaktuellt. Det är ingen individuell köprekommendation eller garanti för ett visst exemplar. Kontrollera bilens identitet, servicehistorik och skick med en kunnig verkstad. Projektet eftersträvar korrekta, källbelagda uppgifter och välkomnar rättelser.

Kod, egen text och egen datasammanställning distribueras under [MIT-licensen](LICENSE). Tredjepartsmaterial omfattas inte; länka till källor i stället för att kopiera deras texter, bilder eller databaser.

## Utveckla webbplatsen

Node.js 24 (eller kompatibel version enligt package.json):

```sh
npm ci
npm run dev
# Öppna http://localhost:4321/used-cars/
npm run check
npm run build
npm test
```

Alla granskade JSON-poster blir automatiskt guider under `/modeller/`. Utkast visas enbart i den tydligt märkta arbetssektionen och under `/forhandsvisning/`, med `noindex, nofollow`. Startsökningen hittar både granskade guider och tydligt separerade utkast. Utkast ingår inte i sitemap. Modellsidan filtrerar varningar efter motor, växellåda och kaross, med försiktiga besked vid saknat underlag.

GitHub Actions bygger och testar på pull requests. Push till `main` publicerar efter godkända kontroller. GitHub Pages använder Actions som källa; webbplatsens basväg är `/used-cars/`. Designen är ljus och avskalad med systemtypsnitt, utan externa typsnitt eller dekorativa bilillustrationer.

Dataformatet är version 2. Kopiera `data/templates/car.json` för en ny generation och följ `docs/DATA.md`. Golf VII är ett källbelagt innehållsexempel med ofullständig variantidentifiering och utan mänsklig granskning.

## Open source och modell-PR:er

Projektet är publikt och MIT-licensierat. Läs [bidragsguiden](CONTRIBUTING.md) för ett komplett exempel från fork till pull request. En modell/generation behöver normalt bara en JSON-fil; inga AI-nycklar krävs. Skapa utkast med `python -m scripts.new_car --help` och validera en fil med `python scripts/validate_data.py data/cars/<id>.json`.

Repo-skills: [research](.agents/skills/car-data/SKILL.md), [granskning](.agents/skills/car-review/SKILL.md) och [modell-PR](.agents/skills/car-pr/SKILL.md). Se även [underhållare](MAINTAINERS.md) och [uppförandekod](CODE_OF_CONDUCT.md). Automatisk CI är inte mänsklig faktagranskning.

Range Rover-exemplet gäller L322 modellår 2012, inte Sport eller L405. Det lästa svenska annonspriset ligger över projektets målbudget; motor- och marknadsavgränsningar är fortfarande ett utkast.
