# Repository guidance

This repository contains an Astro static website deployed to GitHub Pages and a JSON car-data contribution foundation.

For adding, researching or updating car data, read `.agents/skills/car-data/SKILL.md` and `docs/DATA.md`. User-facing content is Swedish. Preserve source traceability and exact variant scope. Do not turn research questions into established facts.

Validate changes with `python scripts/validate_data.py` and `python -m unittest discover -s tests` after installing `requirements-dev.txt` in a virtual environment. Run `npm ci`, `npm run check`, `npm run build`, and `npm test` for website changes. Website implementation follows `docs/PLAN.md`. Adding car records must not require page-specific code.

Repository skills are portable and versioned here: `car-data` authors model data, `car-review` reviews evidence and scope, and `car-pr` prepares a focused contribution. Read the matching SKILL.md under `.agents/skills/` when performing that task. Do not change globally installed skills as part of a repository review. Use `python -m scripts.new_car --help` to scaffold a model; existing files must not be overwritten. Read CONTRIBUTING.md for the fork/PR workflow. A normal model contribution changes data, not page-specific components. Never equate automated or AI review with human approval.
