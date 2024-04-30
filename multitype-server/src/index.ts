
import { log } from 'console';
import express from 'express';
import http from 'http'
import { Server } from 'socket.io';
import Room from './utils/Room';


const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});


io.on('connect', (socket) => {
    const username = socket.handshake.query['username']?.toString()
    log('user connected with id: ', socket.id.toString(), "username", socket.handshake.query['username']?.toString())
    const room = Room.joinEmptyRoom(username ?? '', socket)
    socket.emit('joinedRoom', { roomId: room.roomId, users: room.userNames })
})


server.listen(3000, () => {
    log('server runnin on 3000')
})
