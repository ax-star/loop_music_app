import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import SongRoutes from './routes/SongRoutes';

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use('/api', SongRoutes)

export default app;