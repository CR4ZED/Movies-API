import express from 'express';
import MovieController from '../controllers/movie-controller';
import { checkRole } from '../middlewares';

const router = express.Router();

router.get('/', MovieController.listMovies);

router.get('/search', MovieController.search);

router.post('/', checkRole('admin'), MovieController.create);

router.put('/:id', checkRole('admin'), MovieController.update);

router.delete('/:id', checkRole('admin'), MovieController.delete);

export default router;
