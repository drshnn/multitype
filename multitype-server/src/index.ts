import { log } from "console";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import Room from "./utils/Room";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connect", (socket) => {
  const username = socket.handshake.query["username"]?.toString();
  log(
    "user connected with id: ",
    socket.id.toString(),
    "username",
    socket.handshake.query["username"]?.toString()
  );
  const room = Room.joinEmptyRoom(username ?? "", socket);
  socket.emit("joinedRoom", {
    roomId: room.roomId,
    users: room.userNames,
    words: room.words,
  });
  io.to(room.roomId).emit("newUserJoined", { users: room.userNames });
  if (room.users.length === 4) {
    let i = 3;
    const countdown = setInterval(() => {
      io.to(room.roomId).emit('countdown', i)
      i--;
      if (i == 0) {
        clearTimeout(countdown);

        io.to(room.roomId).emit('started', room.userNames.map(i => { return { ...i, progress: 0 } }))
        room.isStarted = true
      }
    }, 1000);
  }
  socket.on("disconnect", () => {
    log("user disconnected with id ", socket.id.toString());
    room.leaveRoom(socket.id.toString());
    log(room.getRoomSize());
    io.to(room.roomId).emit("someUserLeft", { users: room.userNames });
  });
});

server.listen(3000, () => {
  log("server runnin on 3000");
});
