---
name: car-data
description: Research, add, correct or refresh Swedish used-car model and engine data in this repository, with variant-scoped evidence and AI provenance. Use for car-content contributions, not general website styling or development.
---

# Bildata för svenska begagnatmarknaden

Läs `docs/DATA.md`, `schemas/car.schema.json` och den datapost som ska ändras från repots rot. Följ `CONTRIBUTING.md` för bidragsflödet. Ny post utgår från en befintlig utkastfil och får unikt ID/filnamn.

## Research och avgränsning

- Utgå från svensk marknad och målbudget omkring 100 000 kr. Målbudgeten är inte ett verifierat pris. Vid prisresearch, dokumentera datum, urval, miltal och årsmodeller i PR:n; annonspriser är inte slutpriser.
- Avgränsa generation, motorkod, årsintervall och växellåda innan fel kopplas till en variant. Samma marknadsförda motorstorlek kan omfatta olika konstruktioner. Generalisera inte kedjeproblem till alla motorer med kamkedja.
- Läs källorna. Prioritera tillverkardokumentation, återkallelser, besiktningsunderlag och väl underbyggda oberoende tester. Forumsvar ger researchspår, inte ensamma belägg för vanliga fel. Ange osäkerhet och motstridiga uppgifter.
- Lägg varje källa i `sources`, och knyt varje variant och brist till relevanta `sourceIds`. Ange endast åtkomstdatum för material som faktiskt lästs. Begränsa påståendet till vad källan stödjer; hitta inte på felfrekvens eller reparationskostnad.
- Skriv på svenska med egna ord. Skilj tekniskt belagt fel från symptom och kontrollfråga. En tom problemlista betyder att underlag saknas, inte att bilen är felfri.

## Proveniens och granskning

Ange faktisk AI-leverantör och modell-ID när dessa är tillgängliga, annars `null` i ett utkast. Produktnamnet är inte ett säkert modell-ID. Märk AI-assisterad text korrekt även efter mänsklig korrekturläsning.

Sätt nya och sakligt ändrade poster till `draft`; nollställ mänsklig granskningsinformation och uppdatera genereringsdatum. Fyll inte i en mänsklig granskare eller `reviewed` utan att faktisk granskning har skett. Behåll äldre spårbarhet via Git och beskriv blandade källor/genereringar i PR:n.

## Kontroll och leverans

Kör `python scripts/validate_data.py` och `python -m unittest discover -s tests`. Åtgärda struktur- och referensfel. Kontrollera sedan manuellt att länkarna stödjer respektive påstående och rätt motorvariant; CI kan inte avgöra detta.

Redovisa ändrade filer, källor, kontroller och återstående kunskapsluckor. En färdig dataändring kräver ingen ny sidkomponent. Följ användarens uppdrag för commit eller PR; skillen ger inte själv tillstånd att publicera eller kontakta andra.
