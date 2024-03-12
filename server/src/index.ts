import express from 'express';
import cors from 'cors';
import { notFound, errorHandler } from './middlewares';
import apiRouter from './routes';
import { connectDB } from './services/DB-service';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'MOVIE API'
  });
});

app.use('/api/v1', apiRouter);

app.use(notFound);
app.use(errorHandler);

export const server = app.listen(3000);

export default app;
