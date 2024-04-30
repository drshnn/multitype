import { io } from "socket.io-client"


const URL = 'http://localhost:3000';

export const socket = (username: string) => io(URL, { autoConnect: false, query: { username: username } });
