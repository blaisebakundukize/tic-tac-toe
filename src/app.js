import express from 'express';

import { errorHandler } from './middleware';


const app = express();

app.use(express.json());

app.use(errorHandler);

export { app };
