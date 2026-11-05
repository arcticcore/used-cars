# Dataformat

Det maskinläsbara kontraktet finns i `schemas/car.schema.json`. Filnamnet i `data/cars/` ska vara postens `id` följt av `.json`. Kopiera en befintlig utkastfil för att börja.

- `brand`, `model`, `generation`: identitet, en generation per fil.
- `budgetTargetSek`: projektets målbudget, inte uppmätt marknadspris.
- `status`: `draft` eller `reviewed`. Endast `reviewed` är avsett för framtida publicering.
- `variants`: avgränsade motor-/växellådskombinationer med motorkoder, årsintervall, drivmedel och kamdrivning. Dela upp poster vid tekniska ändringar. Årsintervall måste förklaras i källunderlaget; registreringsår räcker inte alltid för identifiering.
- `issues`: varje brist hänvisar till `variantIds` och `sourceIds`. Beskriv begränsningar i `description`, och använd inte belagd förekomst som bevis på hög frekvens. `documented` betyder att bristen är dokumenterad, inte att alla exemplar drabbas.
- `sources`: stabilt ID, titel, full URL, källtyp och faktiskt åtkomstdatum. Länka till relevanta dokument eller sidor, inte till sökresultat.
- `provenance`: ursprung för den aktuella sammanställningen; `method`, `provider`, `model`, `generatedAt`, `reviewedBy`, `reviewedAt`. Datumformat är YYYY-MM-DD. `generatedAt` används även som sammanställningsdatum för mänskligt skrivet innehåll.

`model` betyder AI-modell under `provenance`, och bilmodell på toppnivån. Skriv det verkliga modell-ID som arbetsverktyget ger; anta inte ett exakt modellnamn utifrån produktnamnet. `null` är tillåtet i utkast när modellidentiteten saknas. Mänskligt sammanställt innehåll har `method: human` och `provider/model: null`; märk inte AI-text som mänsklig enbart för att den har korrekturlästs.

En granskad post kräver minst en källbelagd variant, granskare och granskningsdatum. AI-assisterade granskade poster kräver dessutom leverantör och modellidentitet. Granskaren anges med ett frivilligt offentligt namn eller GitHub-alias. Inga privata personuppgifter, registreringsnummer eller VIN ska läggas till.

Kör `python scripts/validate_data.py`. Valideraren kontrollerar schema, referenser, ID:n, datum och årsintervall. Den verifierar **inte** att källor stödjer uppgifterna eller att en angiven granskare verkligen har granskat. Det kontrolleras vid PR-granskning.

Vid en sakändring: sätt status till `draft`, uppdatera proveniens och nollställ `reviewedBy`/`reviewedAt`. Markera `reviewed` först efter faktisk granskning av det nya underlaget. Vid flera AI-körningar dokumenteras detaljerna i PR:n och den senaste sammanställningens modell i posten; tidigare versioner finns i Git-historiken.
