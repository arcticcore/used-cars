---
name: car-pr
description: Prepare a focused car-model contribution for GitHub, including branch, diff review, checks and PR description. Use when asked to prepare or open a model pull request, not for research or general website deployment.
---

# Förbered modell-PR

Läs `CONTRIBUTING.md`, `.github/pull_request_template.md` och `git status`. Bevara andras ändringar. Kontrollera faktiska remotes och aktuell gren; anta inte att `origin` är huvudrepot i en fork.

För en ny modell: en gren och normalt en datafil per modell/generation. Ingen ny sidkomponent behövs. Föredra `car/<id>` för grennamn. Blanda inte orelaterade schema-, design- eller städändringar i modell-PR:n. Undvik att skriva över befintliga grenar eller force-pusha.

Kör datakontroller, typkontroll, bygge och sidtester enligt bidragsguiden. Granska slutlig diff efter tester. En PR får innehålla ett tydligt utkast med redovisade kunskapsluckor. Hitta inte på granskningsdatum för att få den publicerad.

PR-beskrivningen ska ange modell/generation/år/marknad, ändrade råd, källornas bevis och begränsningar, AI-proveniens samt körda kontroller. Använd repots mall och håll texten proportionerlig. CLI-anrop med flerradig beskrivning använder en temporär fil och `--body-file`, inte shellinterpolerad text.

Att förbereda en PR innebär inte automatiskt att publicera den. Om användaren uttryckligen bett att öppna PR får du pusha uppdragsgrenen och öppna mot `arcticcore/used-cars:main`; verifiera returnerad URL. Fork-PR:er kör läsbehöriga tester och ska inte ges hemligheter eller publicera Pages. Merge och godkännande ingår inte utan uppdrag. Om åtkomst saknas, leverera branch/commit och färdig beskrivning med exakt blockerande steg.
