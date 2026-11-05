# Svenska begagnatbilar kring 100 000 kr

Ett öppet kunskapsprojekt för svenska begagnatmarknaden: motorvarianter, dokumenterade brister och kontrollpunkter inför köp. Målbudgeten är cirka 100 000 kronor, inte ett verifierat marknadspris eller en köprekommendation.

**Status:** planering och datagrund. Ingen webbplats är byggd eller publicerad ännu. Golf VI, BMW 3-serie E90/E91 och Toyota Yaris XP130 finns som researchutkast, utan verifierade tekniska påståenden. Val av generationer är preliminärt tills svenska annonspriser har undersökts.

- [Plan för webbplatsen](docs/PLAN.md)
- [Bidra med en bilmodell eller rättelse](CONTRIBUTING.md)
- [Dataformat och publiceringsregler](docs/DATA.md)
- [AI-skill för bildata](.agents/skills/car-data/SKILL.md)

## Kom igång

Python 3.12 eller senare:

```sh
git clone https://github.com/arcticcore/used-cars.git
cd used-cars
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements-dev.txt
python scripts/validate_data.py
python -m unittest discover -s tests
```

Alla kan föreslå ändringar genom forks och pull requests eller öppna ett issue. AI krävs inte. Pull requests kör datavalidering; en människa granskar faktaunderlaget innan innehåll markeras som granskat.

## Transparens

Varje datapost anger ursprung, genereringsdatum, AI-leverantör och exakt modell när den är känd, samt eventuell granskare och granskningsdatum. Okänd modell anges som `null`, aldrig som ett gissat modellnamn. Sådana AI-utkast får inte markeras som granskade innan modelluppgiften kan styrkas eller innehållet har ersatts med ett nytt spårbart underlag.

Innehållet är allmän information och kan vara ofullständigt eller inaktuellt. Det är ingen individuell köprekommendation eller garanti för ett visst exemplar. Kontrollera bilens identitet, servicehistorik och skick med en kunnig verkstad. Projektet eftersträvar korrekta, källbelagda uppgifter och välkomnar rättelser.

Kod, egen text och egen datasammanställning distribueras under [MIT-licensen](LICENSE). Tredjepartsmaterial omfattas inte; länka till källor i stället för att kopiera deras texter, bilder eller databaser.
