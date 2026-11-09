---
name: car-data
description: Research, add or update Swedish used-car data in this repository. Use for a model contribution or factual correction; use car-review for independent review and car-pr for preparing a pull request.
---

# Skapa eller uppdatera bildata

Läs `docs/DATA.md` och den relevanta modellfilen från repots rot. Format och publiceringsregler har sin källa där; `CONTRIBUTING.md` beskriver bidragsflödet.

## Avgränsa först

Identifiera modell, generation, modellår, kaross och marknad. Registreringsår kan skilja sig från modellår. Exempelvis är Range Rover, Range Rover Sport och Range Rover Evoque olika modeller. Förväxla inte generationer som såldes nära samma år. Sök efter befintlig modellfil innan en ny skapas; utöka samma generations fil i stället för att skapa dubbletter per år.

Skapa ett nytt utkast med `python -m scripts.new_car --help`. Använd `--method ai-assisted --provider <verklig leverantör>` och `--model-id` endast om den faktiska identiteten är känd. Hjälparen skapar datum och ID men inga fakta. Ändra endast modellfilen vid en vanlig bil-PR; schema/UI-förändringar är en separat uppgift om de inte uttryckligen behövs.

## Samla belägg

Läs primärkällor: tillverkardokument, återkallelser, besiktningstester och originaltester. Specialistverkstäders egna observationer kan användas med tydlig begränsning; de är inte representativ felfrekvens. Forum är researchspår. Återge med egna ord, länka till dokumentet, ange faktiskt åtkomstdatum. En källa som inte går att läsa får inte beskrivas som verifierad.

Avgränsa varje tekniskt påstående till rätt motor/årsmodell/marknad. En amerikansk servicebulletin är inte automatiskt en svensk återkallelse. Tillämplighet för en specifik bil kan behöva kontrolleras av verkstad. För inte över problem från äldre motorer eller liknande modellnamn. Kopiera inte VIN, registreringsnummer, säljares namn eller kontaktuppgifter från annonser.

Prisobservationer ska ha datum, miltal och källa. Utgå inte från att en efterfrågad modell ryms inom 100 000 kr. Om den ligger över målbudgeten, skriv det tydligt; hitta inte på billigare exempel för att passa projektet.

## Skriv för en ovan köpare

Annonsnamn och kort köparsammanfattning först, motorkoder i detaljer. Högst fem prioriterade problem inklusive rost och fem enkla visningsfrågor. Skilj dokumenterade problem, användningsrisker och allmänna kontroller. Skriv problem → gäller → symptom → råd. Lägg inte till slitagedelar för att fylla listan.

Avgränsa med `appliesTo`; tom lista betyder alla i den dimensionen. Utrustnings-/karossfel behöver ingen motorkoppling. Förklara års- och marknadsbegränsningar i `label`. Saknat underlag eller tyst motor betyder aldrig felfri bil. Vid otillräckliga belägg: utelämna sakpåståendet och lägg frågan i `researchTasks`.

## Kontrollera och lämna vidare

Nya/sakligt ändrade poster är `draft`; nollställ granskare/datum, uppdatera ursprunget ärligt. Gissa inte AI-modell och kalla inte AI-granskning mänsklig. Automatisk validering är inte faktagranskning.

Kör `python scripts/validate_data.py data/cars/<id>.json`, sedan hela valideringen och testerna enligt `CONTRIBUTING.md`. Kontrollera att källor stöder rätt påstående. Redovisa vilka fakta som tillkommit och kvarstående luckor. PR-hantering sker enligt användarens uppdrag; denna skill ger inte själv tillstånd att pusha, öppna PR eller publicera.
