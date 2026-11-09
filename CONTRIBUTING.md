# Bidra

Du kan bidra med en modell, uppdaterade källor eller en rättelse. Du behöver inte använda AI eller kunna programmera.

## Enklast: öppna ett issue

Använd formuläret **Bildata eller rättelse** på GitHub. Beskriv modell, generation, motor/motorkod, årsmodell, vad som bör ändras och vilka källor som stöder uppgiften. Personliga erfarenheter är välkomna som researchspår men bevisar inte att ett fel är vanligt.

## Ändra data med en pull request

1. Forka repot. Skapa en gren för ändringen.
2. Kopiera `data/templates/car.json` till `data/cars/` för en ny generation, eller redigera befintlig fil. Det går även via pennikonen i GitHubs webbgränssnitt.
3. Följ [dataformatet](docs/DATA.md). Använd unikt ID och motsvarande filnamn. Nya eller sakligt ändrade poster är utkast tills de granskats.
4. Knyt tekniska uppgifter och brister till relevanta motorvarianter och källor. Återge innehåll med egna ord. Använd inte bilder eller material du saknar rätt att bidra med.
5. Ange verklig AI-leverantör/modell om AI användes. Dokumentera research och begränsningar i PR:n. Hitta aldrig på modell-ID, källor eller granskare.
6. Kör kommandona i README om du arbetar lokalt. GitHub kör samma kontroller på din pull request.
7. Skicka PR:n. Beskriv vad som ändrats och varför. Underhållaren granskar källor och accepterar eller begär komplettering.

En godkänd automatisk kontroll är inte en faktagranskning. Underhållaren ansvarar för sammanfogning och publiceringsstatus. Alla kan föreslå data; publikt repo innebär inte att vem som helst skriver direkt till huvudgrenen.

## Med en AI-agent

Repo-skillen finns i `.agents/skills/car-data/SKILL.md`. I Codex kan du be: **Använd $car-data för att lägga till en ny bilmodell som utkast med verifierade källor.** Andra agenter kan läsa samma fil som instruktioner. Skillen stöder både nya poster och periodiska uppdateringar.

Bidrag lämnas under repots MIT-licens. Källhänvisningar ger inte projektet rätt att återpublicera källmaterial.

## Enkel köparinformation

Följ version 2 i dataformatet. Skriv högst fem viktiga problem med tillämplighet, symptom och konkret råd. Skilj dokumenterade modellproblem från användningsrisker och allmänna kontroller. Prisobservationer behöver datum, miltal och källa. Se Golf VII som innehållsexempel, inte som färdiggranskat facit.
