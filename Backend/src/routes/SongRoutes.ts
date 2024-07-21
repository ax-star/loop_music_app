import { Router } from 'express';
import { streamSong } from '../controllers/SongController';

const router = Router();

router.get('/stream-song', streamSong);

export default router;