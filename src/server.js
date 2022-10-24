import http from 'http';

import { app } from './app';
import { environment } from './config';
import { logger } from './utils';

(async () => {
  const port = environment.port;

  // Male a connection to db
  // ---

  const server = http.createServer(app);

  server.listen(port, () => logger.info(`App is running at http://localhost:${port}`));
})();
