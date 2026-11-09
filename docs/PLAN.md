# Enkel bilguide – genomförd struktur 9 november 2026

Astro och TypeScript, statiska JSON-filer, GitHub Pages. Ingen databas eller inloggning.

## Köparens flöde

Ljus startsida med ”Vilken bil tittar du på?”, sökning och enkel modellista. Granskade guider och innehållsutkast visas i separata sektioner. Dekorativa illustrationer och reklamsektioner har tagits bort.

Modellsidan visar i ordning: bilen i korthet, motorval, prioriterade problem, rost och visningschecklista. Källor, motorkoder och proveniens ligger i ett expanderbart detaljavsnitt. Granskningsstatus är synlig direkt.

Högst fem problem inklusive rost och fem enkla visningsfrågor. Skilj kända problem, användningsrisker och allmänna kontroller. Inga generella felfrihetsbetyg. Okända val behåller möjliga varningar; inga matchningar betyder saknat underlag, inte felfrihet. Villkor för utrustning och årsmodell läses i ”Gäller”.

## Data och exempel

Schema version 2; en fil per modell/generation. Tomma motorkoder tillåts i utkast, inte i granskade guider. Separata daterade prisobservationer är annonspriser, inte marknadsvärderingar. Se docs/DATA.md för kontrakt och data/templates/car.json för nya bidrag.

Golf VII har ett källbelagt innehållsexempel för 1.2/1.4 TSI och 1.6/2.0 TDI, med fokus på 2013–2016. Exakta variantgränser, motorkoder och mänsklig granskning återstår. DSG-observationen hålls till bensinunderlaget; rostuppgiften avgränsas till den testade halvkombin. Golf VI bevaras separat. Övriga utkast har migrerats utan nya faktapåståenden.

## Publicering och underhåll

Utkast ligger under /forhandsvisning/ med noindex, inte bland granskade guider eller i sitemap. En sökträff på ett utkast är uttryckligen märkt. Granskade poster ligger under /modeller/. Push till main bygger och testar innan GitHub Pages publicerar.

Verifiera schema, referenser, datum, typkontroll, bygge, interna länkar och filtreringslogik. Kontrollera också mobil, sökning, okänd motor och att källänkar öppnar detaljavsnittet. En ny modell ska kräva en ny datafil, inte en sidkomponent. Sakuppgifter uppdateras med källor och proveniens; mänsklig granskningsstatus nollställs vid sakändring.


## Gemensamma steg i modellguiden

Alla modeller använder `GuideStep.astro`: 1. Motor, 2. Växellåda och 3. Rost.
Problem grupperas med datafältet `category`; `other` ger automatiskt steg 4, Övrigt.
Samma box, ikon, rubrik och problemkort används överallt. Motorvalet filtrerar även
växellåda och gemensamma problem enligt befintliga variantavgränsningar.
Tomma steg visar att underlag saknas, aldrig att bilen är problemfri.
Vid visningen och källorna ligger efter stegen. Nya bilmodeller kräver bara data,
inte nya komponenter eller särskild sidkod.
