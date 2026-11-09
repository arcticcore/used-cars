"""Create one validated research draft without overwriting existing data."""
import argparse
import json
import re
from datetime import date
from pathlib import Path
from scripts.validate_data import ROOT, validate


def create_car(car_id, brand, model, generation, year_from, year_to, method='human', provider=None, model_id=None, output_dir=None, budget_target_sek=100000):
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', car_id):
        raise ValueError('ID must contain lowercase letters, digits and single hyphens')
    if method == 'human' and (provider or model_id):
        raise ValueError('AI metadata requires --method ai-assisted')
    record = json.loads((ROOT / 'data/templates/car.json').read_text())
    record.update(id=car_id, brand=brand, model=model, generation=generation,
                  focusYears={'from': year_from, 'to': year_to}, budgetTargetSek=budget_target_sek)
    record['provenance'] = dict(method=method, provider=provider, model=model_id,
                                generatedAt=date.today().isoformat(), reviewedBy=None, reviewedAt=None)
    errors = validate(record)
    if errors:
        raise ValueError('; '.join(errors))
    path = (Path(output_dir) if output_dir else ROOT / 'data/cars') / f'{car_id}.json'
    with path.open('x', encoding='utf-8') as output:
        output.write(json.dumps(record, ensure_ascii=False, indent=2) + '\n')
    return path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--id', required=True)
    for field in ('brand', 'model', 'generation'):
        parser.add_argument(f'--{field}', required=True)
    parser.add_argument('--year-from', type=int, required=True)
    parser.add_argument('--year-to', type=int, required=True)
    parser.add_argument('--budget-target-sek', type=int, default=100000)
    parser.add_argument('--method', choices=['human', 'ai-assisted'], default='human')
    parser.add_argument('--provider')
    parser.add_argument('--model-id')
    args = parser.parse_args()
    try:
        print(create_car(args.id, args.brand, args.model, args.generation, args.year_from,
                         args.year_to, args.method, args.provider, args.model_id,
                         budget_target_sek=args.budget_target_sek))
    except (ValueError, OSError) as error:
        parser.exit(1, f'{error}\n')

if __name__ == '__main__':
    main()
