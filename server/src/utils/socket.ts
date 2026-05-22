import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);
    socket.on('joinRoom', (room) => socket.join(room));
    socket.on('leaveRoom', (room) => socket.leave(room));
    socket.on('taskUpdated', (payload) => io.emit('taskUpdated', payload));
    socket.on('disconnect', () => console.log('Socket disconnected', socket.id));
  });
};

export const getIo = () => io;
