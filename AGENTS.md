# Repository guidance

This repository currently contains a plan and a data contribution foundation, not a website implementation.

For adding, researching or updating car data, read `.agents/skills/car-data/SKILL.md` and `docs/DATA.md`. User-facing content is Swedish. Preserve source traceability and exact variant scope. Do not turn research questions into established facts.

Validate changes with `python scripts/validate_data.py` and `python -m unittest discover -s tests` after installing `requirements-dev.txt` in a virtual environment. Website implementation should follow `docs/PLAN.md` when requested. Adding car records must not require page-specific code.
