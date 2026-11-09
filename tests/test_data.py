import copy
import json
import unittest
from scripts.validate_data import ROOT, validate

class ValidationTests(unittest.TestCase):
    def setUp(self):
        self.record = json.loads((ROOT / 'data/cars/volkswagen-golf-vii.json').read_text())

    def test_migrated_records_and_template_validate(self):
        for path in list((ROOT/'data/cars').glob('*.json')) + list((ROOT/'data/templates').glob('*.json')):
            self.assertEqual(validate(json.loads(path.read_text())), [], path.name)

    def test_draft_cannot_be_reviewed_without_identity_and_human_review(self):
        self.record['status']='reviewed'
        self.assertTrue(validate(self.record))
        for v in self.record['variants']: v['engineCodes']=['TEST-CODE']
        self.record['provenance'].update(reviewedBy='test-reviewer', reviewedAt='2026-11-09')
        self.assertTrue(any('actual provider and model' in e for e in validate(self.record)))
        self.record['provenance']['model']='test-model'
        self.assertEqual(validate(self.record),[])

    def test_source_and_variant_references_must_resolve(self):
        self.record['issues'][0]['sourceIds']=['missing']
        self.record['issues'][0]['appliesTo']['variantIds']=['missing']
        self.record['priceObservations'][0]['sourceIds']=['missing-price']
        errors=validate(self.record)
        self.assertEqual(sum('unknown source' in e for e in errors),2)
        self.assertTrue(any('unknown variant' in e for e in errors))

    def test_generation_wide_rust_needs_no_engine(self):
        self.assertEqual(self.record['issues'][2]['appliesTo']['variantIds'],[])
        self.assertEqual(validate(self.record),[])

    def test_limits_dates_priorities_and_year_ranges(self):
        for mutate in [
            lambda r:r['issues'].extend(copy.deepcopy(r['issues'])*2),
            lambda r:r.update(viewingChecklist=['x']*6),
            lambda r:r['issues'][1].update(priority=1),
            lambda r:r['priceObservations'][0].update(observedAt='2099-01-01'),
            lambda r:r['focusYears'].update(to=2000),
            lambda r:r['variants'][0].update(yearTo=2000),
        ]:
            with self.subTest(mutate=mutate):
                record=copy.deepcopy(self.record);mutate(record)
                self.assertTrue(validate(record))

if __name__=='__main__': unittest.main()
