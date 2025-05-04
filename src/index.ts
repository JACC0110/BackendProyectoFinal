import express from 'express';
import { sequelize } from './config/database';
import { initSocket, emitUpdate } from './socket/socket';
import { initDbListener } from './listenDB';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.use(express.json());

initSocket(server);

initDbListener((payload) => {
  emitUpdate(payload);
});

const PORT = 3000;

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
