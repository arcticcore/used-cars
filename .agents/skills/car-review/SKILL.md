---
name: car-review
description: Review a car-data change or pull request for evidence, variant scope, buyer clarity and provenance. Use for review of model data; does not implement the contribution or mark AI review as human approval.
---

# Granska en bilmodell

Läs `docs/DATA.md`, PR-diffen och de ändrade datafilerna. Läs även basversionen för att upptäcka borttagna varningar, bredare tillämplighet eller ändrad granskningsstatus. Bedöm endast faktisk diff; en PR med flera modeller behöver inte avvisas om den har en tydlig gemensam rättelse.

Kontrollera originalkällorna för nya/ändrade sakpåståenden. Notera modell, generation, årsintervall, marknad, motor och växellåda. Skilj registreringsår från modellår, servicebulletin från återkallelse och förekomst från frekvens. Läs annonspris som prisobservation, aldrig marknadsvärdering. Om källan är otillgänglig: skriv att kontroll saknas, inte att uppgiften är verifierad.

Kontrollera att varje varning har begripligt symptom och ett användbart villkorat råd. Mekaniska diagnoser ska inte förväntas av köparen. Kontrollera rost-/utrustningsproblem utan motoranknytning, okända val och att inga matchningar framställs som felfrihet. Kontrollera att diesel inte får en bensinmotors varning.

Kör datavalidering för filen och fulla kontroller enligt `CONTRIBUTING.md` när arbetsmiljön tillåter. Rapportera separat: automatiska kontroller, manuellt källkontrollerade uppgifter och ej verifierade uppgifter. Ett grönt CI-resultat eller ditt eget utlåtande är inte en mänsklig granskares signatur.

Återge konkreta fynd med fil/fält, varför det påverkar köparen, källa och föreslagen rättelse. Prioritera fel modell/motor, obelagda avrådanden och felaktig granskningsstatus framför språkpolering. Om inga fynd finns, säg det och ange verifieringens gränser. Ändra inte data, godkänn inte PR via GitHub, sätt inte `reviewed` och mergea inte utan ett uttryckligt uppdrag för respektive åtgärd.
