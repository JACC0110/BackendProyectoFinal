import { Server } from 'socket.io';
import { Friend } from '../models/Friends';

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

  io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    Friend.findAll()
      .then(friends => {
        const tableName = Friend.getTableName();
        const friendData = friends.map(friend => ({
          id: friend.id,
          name: friend.name,
          gender: friend.gender,
          tableName
        }));

        socket.emit('initialData', friendData);
      })
      .catch(err => {
        console.error('Error al obtener los datos:', err);
      });

    socket.on('myFriendUpdated', (data: Friend) => {
      console.log('Amigo actualizado:', data);
      io.emit('myFriendUpdated', data);
    });
  });
};

export const emitUpdate = (data: Friend) => {
  io.emit('myFriendUpdated', data);
};
