import { Client } from 'pg';
import dotenv from 'dotenv';
import { Friend } from './models/Friends';

dotenv.config();

const client = new Client({
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
});

export const initDbListener = (onNotify: (payload: Friend) => void) => {
  client.connect()
    .then(() => {
      console.log('Listener conectado a PostgreSQL');
      client.query('LISTEN my_friend_update');
    });

  client.on('notification', async (msg) => {
    const payload = JSON.parse(msg.payload!);
    console.log('Evento recibido de Postgres:', payload);
    onNotify(payload);
  });
};
