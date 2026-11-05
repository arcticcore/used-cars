import json
import unittest
from scripts.validate_data import ROOT, validate


class ValidationTests(unittest.TestCase):
    def setUp(self):
        self.record = json.loads((ROOT / 'data/cars/volkswagen-golf-vi.json').read_text())

    def test_draft_is_valid_but_cannot_be_published_without_review(self):
        self.assertEqual(validate(self.record), [])
        self.record['status'] = 'reviewed'
        self.assertTrue(validate(self.record))

    def test_source_and_variant_references_must_resolve(self):
        self.record['issues'] = [{'id': 'example', 'title': 'Example', 'variantIds': ['missing'],
            'description': 'Example only', 'symptoms': ['Noise'], 'checks': ['Inspect'],
            'evidence': 'reported', 'sourceIds': ['missing']}]
        errors = validate(self.record)
        self.assertTrue(any('unknown source' in error for error in errors))
        self.assertTrue(any('unknown variant' in error for error in errors))

    def test_reviewed_ai_record_requires_model_identity(self):
        self.record.update(status='reviewed', sources=[{'id':'example', 'title':'Example',
            'url':'https://example.org', 'accessedAt':'2020-01-01', 'kind':'manufacturer'}],
            variants=[{'id':'example','label':'Example','engineCodes':['EXAMPLE'], 'fuel':'petrol',
            'yearFrom':2000,'yearTo':2001,'transmission':'manual','timingDrive':'unknown','sourceIds':['example']}])
        self.record['provenance'].update(generatedAt='2020-01-01', reviewedBy='test-reviewer', reviewedAt='2020-01-02')
        self.assertTrue(any('actual provider and model' in e for e in validate(self.record)))
        self.record['provenance']['model'] = 'test-model-identifier'
        self.assertEqual(validate(self.record), [])
        self.record['variants'][0]['yearTo'] = 1999
        self.assertTrue(any('reversed year' in e for e in validate(self.record)))


if __name__ == '__main__':
    unittest.main()
