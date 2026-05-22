import http from 'http';
import app from './app';
import { connectDatabase } from './config/database';
import { initSocket } from './utils/socket';
import { appConfig } from './config/appConfig';

const startServer = async () => {
  await connectDatabase();
  const server = http.createServer(app);
  initSocket(server);
  server.listen(appConfig.port, () => {
    console.log(`Server running on http://localhost:${appConfig.port}`);
  });
};

startServer().catch((error) => {
  console.error('Server failed to start', error);
  process.exit(1);
});
