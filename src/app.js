import express from 'express';

import { errorHandler } from './middleware';
import { v1Router } from './api/router';
import environment from './config/environment';


const app = express();

app.use(express.json());

const { apiPrefix } = environment;

app.use(`${apiPrefix}`, v1Router);

app.use(errorHandler);

export { app };
