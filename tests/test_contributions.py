import json
import tempfile
import unittest
from pathlib import Path
from scripts.new_car import create_car
from scripts.validate_data import ROOT, validate

class ContributionTests(unittest.TestCase):
    def test_scaffold_is_valid_and_never_overwrites(self):
        with tempfile.TemporaryDirectory() as directory:
            args=('example-car-generation','Example','Car','Generation',2010,2012)
            path=create_car(*args,output_dir=directory)
            original=path.read_bytes()
            record=json.loads(original)
            self.assertEqual(validate(record),[])
            self.assertEqual(record['provenance']['method'],'human')
            self.assertIsNone(record['provenance']['reviewedBy'])
            with self.assertRaises(FileExistsError): create_car(*args,output_dir=directory)
            self.assertEqual(path.read_bytes(),original)

    def test_invalid_input_creates_no_file(self):
        with tempfile.TemporaryDirectory() as directory:
            for car_id, start, end in [('../escape',2010,2012),('valid-id',2012,2010)]:
                with self.assertRaises(ValueError):
                    create_car(car_id,'A','B','C',start,end,output_dir=directory)
            with self.assertRaises(ValueError):
                create_car('valid-id',' ','B','C',2010,2012,output_dir=directory)
            self.assertEqual(list(Path(directory).iterdir()),[])

    def test_unknown_ai_model_is_preserved_as_unknown(self):
        with tempfile.TemporaryDirectory() as directory:
            path=create_car('example-car','Example','Car','A',2012,2012,
                            method='ai-assisted',provider='OpenAI',output_dir=directory)
            self.assertIsNone(json.loads(path.read_text())['provenance']['model'])

    def test_draft_cannot_claim_review_or_human_authorship_with_ai_fields(self):
        record=json.loads((ROOT/'data/cars/land-rover-range-rover-l322.json').read_text())
        record['provenance']['reviewedBy']='someone'
        self.assertTrue(any('draft must not' in e for e in validate(record)))
        record['provenance']['reviewedBy']=None
        record['provenance']['method']='human'
        self.assertTrue(any('human content' in e for e in validate(record)))

if __name__=='__main__': unittest.main()
