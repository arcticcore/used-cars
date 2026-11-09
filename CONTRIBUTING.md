# Bidra med en bilmodell

Alla kan bidra, med eller utan AI. En vanlig modelländring behöver bara en JSON-fil. Webbplatsen skapar sidan automatiskt. Texten för köparen är på svenska; issues och PR-diskussioner får vara på svenska eller engelska.

## Utan utvecklingsmiljö

Öppna [Bildata eller rättelse](https://github.com/arcticcore/used-cars/issues/new?template=car-data.yml) med modell, generation, modellår och källor. Eller forka repot i GitHub, kopiera `data/templates/car.json` till `data/cars/<id>.json`, redigera och välj **Contribute → Open pull request**. Byt mallens identitet och datum och ange korrekt mänskligt eller AI-assisterat ursprung. CI visar formatfel.

## Från fork till PR

Forka [arcticcore/used-cars](https://github.com/arcticcore/used-cars), klona din fork och kör från repots rot. Kräver Python 3.12+ och Node.js 24. Windows kan använda `.venv\Scripts\python` i stället för `python` efter aktiveringssteget.

```sh
git clone https://github.com/DITT-KONTO/used-cars.git
cd used-cars
git remote add upstream https://github.com/arcticcore/used-cars.git
git switch -c car/volvo-v70-p3
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements-dev.txt
npm ci
python -m scripts.new_car --id volvo-v70-p3 --brand Volvo --model V70 --generation P3 --year-from 2010 --year-to 2013
```

Åren ovan är ett researchurval, inte verifierad bildata. Hjälparen skapar ett utkast med dagens datum och vägrar skriva över filer. Använder du AI lägger du till `--method ai-assisted --provider LEVERANTÖR`, och `--model-id EXAKT-ID` endast när det är känt. För en befintlig generation uppdaterar du dess fil; skapa inte en ny fil per årsmodell.

Fyll filen enligt [dataformatet](docs/DATA.md). Ange högst fem prioriterade problem, enkel köpartext, rätt motor-/kaross-/marknadsavgränsning och källor. Samla datum och miltal för annonspriser. Saknade belägg blir researchfrågor. Ingen AI, betald tjänst eller API-nyckel krävs.

```sh
python scripts/validate_data.py data/cars/volvo-v70-p3.json
python scripts/validate_data.py
python -m unittest discover -s tests
npm run check
npm run build
npm test
npm run dev
# http://localhost:4321/used-cars/forhandsvisning/volvo-v70-p3/
```

Kontrollera motorval, gemensamma varningar, källor, mobil och besked vid saknade uppgifter. Stoppa dev-servern efteråt med `npx astro dev stop`.

```sh
git add data/cars/volvo-v70-p3.json
git commit -m "Add Volvo V70 P3 research draft"
git push -u origin car/volvo-v70-p3
```

Öppna PR från din fork/gren till `arcticcore/used-cars:main` i GitHub. Beskriv underlag och luckor enligt mallen. En modell/generation per PR är normalfallet; gemensamma rättelser kan omfatta flera. Underhållaren granskar och sammanfogar. Du behöver inte få direkt skrivåtkomst till huvudrepot.

## Vad godkänns?

CI kontrollerar format, referenser, datum, typer, bygge och sidlänkar. Fork-PR:er får inga publiceringshemligheter och publicerar inte webbplatsen. GitHub kan kräva att underhållaren startar första körningen för en ny bidragsgivare.

Källgranskning görs separat. Utkast kan mergeas och visas som märkta förhandsvisningar. `reviewed` kräver faktisk mänsklig granskning och fullständig proveniens enligt dataformatet. AI-granskning räknas inte som detta. Vid sakändring återgår posten till `draft`, med nollställd granskare/datum. Alla kan föreslå; det innebär inte automatisk publicering som granskad guide.

## Skills som följer med repot

- [`car-data`](.agents/skills/car-data/SKILL.md): research och modellfil.
- [`car-review`](.agents/skills/car-review/SKILL.md): granskning av diff, källor och råd.
- [`car-pr`](.agents/skills/car-pr/SKILL.md): gren, kontroller och PR-underlag.

Exempel: ”Använd $car-data för att lägga till en Volvo V70 som utkast”, ”Använd $car-review för att granska modelländringen”, ”Använd $car-pr för att öppna en PR för den färdiga grenen”. Codex hittar repo-skills; andra agenter kan läsa filerna direkt. Inga personliga installerade skills behövs.

## Rättigheter och samarbete

Bidrag omfattas av [MIT-licensen](LICENSE). Ingen CLA eller betald tjänst krävs. Bidra endast med material du får dela: egna sammanfattningar och länkar, inte kopierade artiklar, annonsbilder, VIN, registreringsnummer eller kontaktuppgifter. Följ [uppförandekoden](CODE_OF_CONDUCT.md). Underhåll och granskningsansvar beskrivs i [MAINTAINERS.md](MAINTAINERS.md).
