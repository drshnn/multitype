import { Server, Socket } from "socket.io";
import { RoomUser } from "../types/User";
import { MAX_ROOM_SIZE } from "./Constants";
import { randomUUID } from "crypto";
import { words } from "./Words";

export default class Room {
    private _roomId: string;
    private _users: RoomUser[] = [];
    static rooms: Room[] = [];
    private _words: string;
    private _isStarted: boolean = false;
    constructor(username: string, socket: Socket, words: string) {
        this._roomId = randomUUID().toString();
        this.join(username, socket)
        this._words = words
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
    public get isStarted() {
        return this._isStarted;
    }
    public set isStarted(isStarted: boolean) {
        this._isStarted = isStarted
    }
    private set users(users: RoomUser[]) {
        this._users = users;
    }
    public get userNames() {
        return this._users.map((i, j) => { return { username: i.username, id: j } })
    }
    public get words() {
        return this._words
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
        const emptyRooms = Room.rooms.filter(room => room.getRoomSize() < MAX_ROOM_SIZE && !room.isStarted)
        if (emptyRooms.length == 0) {
            //make a db call for a list of words
            const room = new Room(username, socket, words)
            return room
        }
        emptyRooms[0].join(username, socket)
        return emptyRooms[0]
    }

    public leaveRoom(sessionId: string) {
        const newUsersList = this.users.filter(i => i.socket.id.toString() !== sessionId)
        this.users = newUsersList
    }


    /**
     * write a logic to destroy the room once race completes and everyone leaves
     */
    public destroy() {

    }

}
