import express from 'express';
import songRoutes from './routes/song.routes.js';


const app = express();
app.use(express.json());

app.use('/api', songRoutes);

export default app;