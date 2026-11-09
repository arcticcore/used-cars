# Dataformat version 2

En JSON-fil per modell och generation i `data/cars/`. Filnamnet ska matcha `id`. Kontraktet är `schemas/car.schema.json`. Kopiera `data/templates/car.json`, byt identitet och lägg den under `data/cars/`.

## Innehåll för köparen

- `focusYears`: guidens årsurval (`from`, `to`), inte generationens hela tillverkningsperiod. `null` om okänt.
- `budgetTargetSek`: målbudget som positivt heltal i kronor, inte prisbedömning. Standardvärdet i mallen är 100 000 kr; varje guide kan ha en egen budget.
- `priceObservations`: daterade annonsobservationer med beskrivning, årsmodell, miltal i svenska mil, pris i SEK och källreferenser. Ange extra avgifter i beskrivningen. Gamla annonser är historiska prisankare, inte erbjudanden eller marknadsvärderingar.
- `variants`: annonsnamn, drivmedel, årsavgränsning, motorkoder, växellåda, kamdrivning, `buyerSummary` och källor. Tomma motorkoder är tillåtna endast i utkast; ange uttryckligen kvarstående identifiering. Årsintervall i utkast kan vara researchurval och får inte presenteras som verifierad produktionsperiod.
- `issues`: högst fem prioriterade punkter totalt, inklusive rost. Ingen utfyllnad med normalt slitage. `category` är `engine`, `transmission`, `rust` eller `other`. `kind` är `known-problem`, `usage-risk` eller `general-check`. En dokumenterad konstruktionsrisk är inte bevis för vanligt förekommande skador.
- Varje problem har unik `priority` (1–5), beskrivning, `symptoms`, `advice`, `action` (`check` eller `resolve-before-buying`) och `sourceIds`. Råd är redaktionell tolkning; källor ska stödja sakpåståenden.
- `viewingChecklist`: högst fem allmänna, enkla kontrollfrågor. De är inte i sig påståenden om modellfel.

## Vad gäller problemet?

`appliesTo` innehåller `variantIds`, `bodyStyles`, `transmissions`, `equipment` och en läsbar `label`. Tom array betyder ingen begränsning i just den dimensionen. Alla tomma arrayer betyder hela generationen. Ange alltid begränsningar för årsmodell och undersökt underlag i `label`; motorvarianternas årsintervall ska avgränsas när det behövs.

Filtrering använder AND mellan dimensioner och OR inom en array. Okänt val behåller möjliga varningar. Utrustning filtreras inte i första UI-versionen: utrustningsberoende varningar ligger kvar med tydlig villkorstext. Motorn måste inte anges för kaross-/utrustningsproblem. Använd `Halvkombi`, `Kombi`, `Manuell` och `DSG` konsekvent; nya värden får tillkomma via data och visas automatiskt som filterval.

## Källor och granskning

`sourceIds` måste motsvara källor i samma fil. Varje källa har titel, full HTTP(S)-URL, typ och faktiskt åtkomstdatum. Länka inte till sökresultat och kopiera inte artiklar.

`status` är `draft` eller `reviewed`. Utkast kan visas i en separat, uttryckligen märkt förhandsvisning med noindex. De ingår inte i sitemap eller granskat guideutbud. Startsökningen hittar även utkast i deras separata sektion; det är inte ett påstående om granskning.

`provenance` anger sammanställningssätt, verklig AI-leverantör/modell, sammanställningsdatum och faktisk mänsklig granskare/datum. Okänt AI-modell-ID anges som `null`, aldrig gissning. Granskade AI-poster kräver verkligt modell-ID. En människas korrekturläsning gör inte AI-text mänskligt genererad.

Vid sakändring: sätt `draft`, uppdatera proveniens och nollställ granskare/datum. Teknisk migration utan faktabyte ändrar inte ursprungsdatum. Märk inte `reviewed` utan faktisk granskning; Git-historiken bevarar tidigare versioner.

Kör datavalidering och tester enligt README. Kontrollerna bevisar inte att källan stöder en uppgift. Granskaren måste kontrollera sakunderlag, årsintervall, motorkoder och tillämplighet manuellt. Inga privata personuppgifter, VIN eller registreringsnummer ska lagras.

## Modell-PR och verktyg

`python -m scripts.new_car --help` skapar en fil från mallen med dagens datum och utan att skriva över befintlig data. Välj mänskligt eller AI-assisterat ursprung korrekt. Sök först efter samma modell/generation; samma fil kan utökas till fler modellår. `python scripts/validate_data.py data/cars/<id>.json` kontrollerar en enskild fil, och kommandot utan argument kontrollerar alla.

Utkast får inte innehålla en mänsklig granskningssignatur. Mänskligt skrivna poster har null i AI-fälten. Skillnaden mellan modellår, tillverkningsår och registreringsår ska framgå där den påverkar urvalet. Ett nordamerikanskt tekniskt meddelande är inte automatiskt tillämpligt på svensk bil eller en återkallelse. Om en efterfrågad modell kostar mer än målbudgeten, redovisa det i sammanfattning och faktiska prisobservationer i stället för att anpassa priserna.
