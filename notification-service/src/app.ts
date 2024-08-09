import express, { Express, Request, Response } from 'express';
// import { rateLimit } from 'express-rate-limit'
import cors from 'cors';
import bodyParser from 'body-parser';
import alertRouter from './routers/alert.router';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  console.info('Received health check request');
  return res.status(200).json({ status: 'OK', message: 'Server ready' });
});

app.use('/v1/alerts', alertRouter);

export default app;
