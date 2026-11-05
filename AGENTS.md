# Repository guidance

This repository contains an Astro static website deployed to GitHub Pages and a JSON car-data contribution foundation.

For adding, researching or updating car data, read `.agents/skills/car-data/SKILL.md` and `docs/DATA.md`. User-facing content is Swedish. Preserve source traceability and exact variant scope. Do not turn research questions into established facts.

Validate changes with `python scripts/validate_data.py` and `python -m unittest discover -s tests` after installing `requirements-dev.txt` in a virtual environment. Run `npm ci`, `npm run check`, `npm run build`, and `npm test` for website changes. Website implementation follows `docs/PLAN.md`. Adding car records must not require page-specific code.
