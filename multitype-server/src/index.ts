
import { log } from 'console';
import express from 'express';
import http from 'http'
import { Server } from 'socket.io';


const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});


io.on('connect', (socket) => {
    log('user connected with id: ', socket.id.toString())
    // socket.join(randomUUID())
    // //list rooms
    // log(io.sockets.adapter.rooms)
})

server.listen(3000, () => {
    log('server runnin on 3000')
})
