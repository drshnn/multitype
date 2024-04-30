import { Server, Socket } from "socket.io";
import { RoomUser } from "../types/User";
import { MAX_ROOM_SIZE } from "./Constants";
import { randomUUID } from "crypto";

export default class Room {
    private _roomId: string;
    private _users: RoomUser[] = [];
    static rooms: Room[] = [];
    constructor(username: string, socket: Socket) {
        this._roomId = randomUUID().toString();
        this.join(username, socket)
    }

    public get roomId() {
        return this._roomId;
    }

    public set roomId(roomId) {
        this._roomId = this.roomId;
    }
    public get users() {
        return this._users;
    }
    public get userNames() {
        return this._users.map(i => i.username)
    }

    private join(username: string, socket: Socket) {
        socket.join(this._roomId)
        this._users.push({ username, socket })
        Room.rooms.push(this)
    }

    public getRoomSize() {
        return this._users.length
    }

    // public static getEmptyRoom(): string {
    //     const emptyRooms =Room.rooms.filter(room => room.getRoomSize() < MAX_ROOM_SIZE)
    //     if (emptyRooms.length == 0) {
    //         return ''
    //     }
    //     return emptyRooms[0].roomId
    // }

    public static joinEmptyRoom(username: string, socket: Socket): Room {
        const emptyRooms = Room.rooms.filter(room => room.getRoomSize() < MAX_ROOM_SIZE)
        if (emptyRooms.length == 0) {
            const room = new Room(username, socket)
            return room
        }
        emptyRooms[0].join(username, socket)
        return emptyRooms[0]
    }

}
