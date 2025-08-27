import express from 'express';
import multer from 'multer';
import { SuperheroController } from './superhero.controller';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

const superheroController = new SuperheroController();

router.get('/', superheroController.getAll);
router.get('/:id', superheroController.getById);
router.post('/', upload.array('photos', 10), superheroController.create);
router.patch('/:id', upload.array('photos', 10), superheroController.update);
router.delete('/:id', superheroController.delete);

export default router;
