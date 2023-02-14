import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: '*' }));
app.use(router);

export default app;
