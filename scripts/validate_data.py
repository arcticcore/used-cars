"""Validate car data shape, relationships and editorial invariants."""
import json
import sys
from datetime import date
from pathlib import Path
from jsonschema import Draft202012Validator, FormatChecker

ROOT = Path(__file__).resolve().parents[1]
SCHEMA = json.loads((ROOT / 'schemas/car.schema.json').read_text())
Draft202012Validator.check_schema(SCHEMA)
VALIDATOR = Draft202012Validator(SCHEMA, format_checker=FormatChecker())


def validate(record):
    errors = [f'{".".join(map(str, e.absolute_path))}: {e.message}' for e in VALIDATOR.iter_errors(record)]
    if errors:
        return errors
    for collection in ('variants', 'issues', 'sources'):
        ids = [item['id'] for item in record[collection]]
        if len(ids) != len(set(ids)):
            errors.append(f'{collection}: duplicate IDs')
    source_ids = {item['id'] for item in record['sources']}
    variant_ids = {item['id'] for item in record['variants']}
    for item in record['variants'] + record['issues'] + record['priceObservations']:
        if set(item['sourceIds']) - source_ids:
            errors.append(f'{item.get("id", "price")}: unknown source reference')
    for issue in record['issues']:
        if set(issue['appliesTo']['variantIds']) - variant_ids:
            errors.append(f'{issue["id"]}: unknown variant reference')
    for variant in record['variants']:
        if variant['yearFrom'] > variant['yearTo']:
            errors.append(f'{variant["id"]}: reversed year range')
    years = record['focusYears']
    if years and years['from'] > years['to']:
        errors.append('reversed focus year range')
    priorities = [i['priority'] for i in record['issues']]
    if len(priorities) != len(set(priorities)):
        errors.append('duplicate issue priorities')
    provenance = record['provenance']
    dates = [p['observedAt'] for p in record['priceObservations']] + [provenance['generatedAt']] + [s['accessedAt'] for s in record['sources']]
    if provenance['reviewedAt']:
        dates.append(provenance['reviewedAt'])
        if provenance['reviewedAt'] < provenance['generatedAt']:
            errors.append('reviewedAt precedes generatedAt')
    if any(date.fromisoformat(value) > date.today() for value in dates):
        errors.append('future date')
    if record['status'] == 'reviewed' and provenance['method'] == 'ai-assisted':
        if not all(provenance[key] and provenance[key].strip() for key in ('provider', 'model')):
            errors.append('reviewed AI content requires actual provider and model')
    return errors


def main():
    paths = sorted((ROOT / 'data/cars').glob('*.json'))
    failures = []
    if not paths:
        failures.append('No car data files found')
    for path in paths:
        try:
            record = json.loads(path.read_text())
            errors = validate(record)
            if isinstance(record, dict) and path.stem != record.get('id'):
                errors.append('filename must match record id')
            failures.extend(f'{path.name}: {error}' for error in errors)
        except (ValueError, OSError) as error:
            failures.append(f'{path.name}: {error}')
    if failures:
        print('\n'.join(failures), file=sys.stderr)
        return 1
    print(f'Validated {len(paths)} car records. Drafts are not publishable content.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
