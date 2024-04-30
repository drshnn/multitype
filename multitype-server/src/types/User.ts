import { Socket } from "socket.io";

export interface RoomUser {
    username: string,
    socket: Socket
}
