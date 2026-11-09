# Underhåll och granskning

Nuvarande underhållare är [@arcticcore](https://github.com/arcticcore). Projektet är öppet och MIT-licensierat. Alla kan lämna förslag; underhållaren beslutar om merge och publiceringsstatus. CODEOWNERS begär granskning men är inte i sig ett tekniskt mergeskydd.

För modell-PR:er granskas identitet/generation, marknads- och motoravgränsning, originalkällor, köparråd, proveniens och CI-resultat. Dokumentera invändningar konkret. Utkast får mergeas med tydlig märkning; de blir inte granskade guider automatiskt. En mänsklig granskare får ange sitt offentliga alias och datum efter faktisk kontroll; en AI-agent får inte tillskriva någon en granskning.

Ny modell kräver normalt ingen schemaändring. Ändringar i kontrakt eller publiceringsflöde hanteras separat med migrering och tester. Site deploy sker på main efter godkända kontroller. Vid felaktig uppgift: rätta den eller återställ till utkast. En felaktig commit kan återställas med en vanlig revert-PR; undvik omskrivning av delad historik.

Inga svarstider utlovas. En ny underhållare utses av befintlig underhållare efter överenskommelse; uppdatera detta dokument och CODEOWNERS samtidigt. Gren-/ruleset-skydd hanteras i GitHub-inställningarna och måste verifieras där om det ska betraktas som tvingande.
