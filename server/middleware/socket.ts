import { useFetch } from 'nuxt/app';
import { Server } from 'socket.io';

const io = new Server(3002, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

const onlineUsers = new Set();

io.on('connection', (socket) => {

    onlineUsers.add(socket.id);
    console.log('User connected:', socket.id);


    socket.on('disconnect', () => {
        onlineUsers.delete(socket.id);
        console.log('User disconnected:', socket.id);

        const rooms = Object.keys(socket.rooms);
        rooms.forEach((room) => {
            if (room.startsWith('room-')) {
                socket.leave(room); 
            }
        });
    });
    
    
    socket.on('message', (message, sender, receiver, match_by, match_to) => {

        const room = `room-${match_by}${match_to}`;
        socket.to(room).emit('message', message);
        console.log(`user ${sender.name} speak : ${message} to room : ${room}`);
    });

    socket.on('messageTo', (match_by, match_to) => {

        const room = `room-${match_by}${match_to}`;

        socket.join(room);

        console.log("join room")
    });
});



export default defineEventHandler((event) => {
    console.log('New request event');
});
