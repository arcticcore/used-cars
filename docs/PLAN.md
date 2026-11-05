# Plan: första versionen

## Syfte och avgränsning

En svensk, mobilvänlig faktaguide för begagnade bilar kring 100 000 kr. Besökaren ska förstå skillnader mellan motorvarianter och kunna ta med konkreta frågor till säljaren eller verkstaden. Undvik ett förenklat totalbetyg som får osäkra uppgifter att se exakta ut.

Första versionen är en statiskt genererad webbplats med Astro och TypeScript, som föreslaget teknikval. JSON är datakällan; ingen databas, inloggning eller administration behövs. Webbteknik och beroendeversioner verifieras när implementationen börjar. Genererade HTML-sidor kan hostas på valfri statisk hosting. GitHub Pages är vald hosting enligt användarens uppdrag den 5 november 2026.

## Tre startmodeller

| Modell | Preliminär generation | Researchfokus |
| --- | --- | --- |
| Volkswagen Golf | VI | Motorkoder, kamkedja/kamrem, dokumenterade problem och skillnader mellan växellådor. |
| BMW 3-serie | E90/E91 | Bensin/diesel, exakta motorfamiljer, eventuella kedjeproblem och underhåll. |
| Toyota Yaris | XP130 | Bensin/hybrid, servicebehov, dokumenterade brister och relevanta batterikontroller. |

Detta är ett urval för research, inte tre verifierade köprekommendationer. Undersök först svenska annonser kring 80 000–120 000 kr. Dokumentera datum, urval, årsmodell och miltal. Annonspriser är begärda priser, inte slutpriser. Justera generationerna om prisbilden kräver det. Budgetfältet i startdatan är en målbudget, inte en prisuppskattning.

För varje modell:

1. Identifiera relevanta generationer, motorer, motorkoder, årsintervall och växellådor för svenska marknaden.
2. Verifiera tekniska uppgifter via tillverkardokumentation, återkallelser och väl underbyggda oberoende tester. Använd forum som researchspår, inte ensamt belägg för vanliga fel.
3. Knyt varje brist till berörda varianter och konkreta källor. Skilj på rapporterat problem, dokumenterat problem och belagd frekvens. Kamkedja i sig är inte ett fel och kamrem i sig är inte en garanti för tillförlitlighet.
4. Skriv symptom och kontrollfrågor utan att ge sken av att besökaren säkert kan diagnostisera bilen själv.
5. Redovisa AI-modell och mänsklig granskning. Publicera endast granskade poster.

## Sidor och funktioner

- Startsida med målbudget, sökning och modellkort. Kort visar generation och granskningsdatum.
- Modellöversikt med enkla filter för märke och drivmedel.
- En sida per generation, med motorvarianter, brister, symptom, kontrollpunkter och källhänvisningar vid respektive uppgift.
- Om/metodik med AI-transparens, informationsbegränsningar och rättelseväg.
- Bidra-länk till modellens JSON på GitHub och färdigt issueformulär.

Modellsidan visar uttryckligen vad som saknar underlag. En tom problemlista betyder inte att modellen är problemfri. `draft` får inte förekomma bland granskade modellkort, i guidernas publika sökindex eller i sitemap. För att testa webbplatsen före faktagranskning visas utkast i en separat sektion ”På arbetsbänken” och på tydligt märkta `/forhandsvisning/`-sidor med `noindex, nofollow`. Dessa sidor visar researchfrågor och proveniens, inte ogranskade motor- eller feluppgifter. Granskade uppgifter äldre än sex månader får en tydlig markering om att uppdatering behövs.

Visuellt: saklig svensk konsumentguide, god typografi, tydliga tabeller på desktop och läsbara variantkort på mobil. Varningar uttrycks med text och inte bara färg. Inga stockbilder eller märkeslogotyper behövs för första versionen.

## Skalbarhet och underhåll

En JSON-fil per modell/generation ger små begripliga pull requests och automatisk generering av sidor. Schemat är versionsmärkt. Återkommande motorfamiljer kan senare brytas ut i delade poster om duplicering blir ett praktiskt problem. Vid ett framtida CMS- eller databasbyte kan JSON importeras med samma stabila ID:n.

Granska innehållet 2–4 gånger per år och vid relevanta rättelser. Uppdatera källa, innehåll och proveniens tillsammans. Git-historiken visar tidigare versioner. Ny AI-generering nollställer mänsklig granskningsstatus. Inga schemalagda jobb eller automatiska AI-publiceringar införs i första steget.

## Leveransordning och godkännandekriterier

1. Publikt repo, bidragsguide, skill, schema, tre utkast och CI (denna grund).
2. Research av svenska prisnivåer och avgränsade motorvarianter; tre källgranskade poster.
3. Bygg statisk webbplats med sidor och filter enligt ovan.
4. Kontrollera mobil, tangentbord, källänkar, genererade sidor och att utkast inte publiceras.
5. Välj hosting och publicera webbplatsen.

En fjärde bilmodell ska kunna läggas till med endast en ny validerad datafil, utan ändringar i sidkomponenterna. En bidragsgivare ska kunna föreslå en rättelse utan att installera utvecklingsverktyg genom GitHubs webbgränssnitt.

## Implementerat 5 november 2026

Statisk Astro-webbplats med responsiv grafit/lime-design, generiska SVG-bilillustrationer, datadrivna modell- och förhandsvisningssidor, metodsida, 404-sida och sitemap. Sök/märkes-/drivmedelsfilter aktiveras när granskade poster finns. CI kontrollerar data, typer, bygge och interna länkar innan GitHub Pages publicerar. Faktaresearch och mänsklig granskning återstår separat.
