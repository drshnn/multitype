const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
const { log } = require('console');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173'
    }
});

io.on('connect',(socket)=>{
    log("connected: ",socket.id)
    io.emit("userAdded",{userCount:1})
})
server.listen(3000,()=>{
    log('server is running on',3000)
})
