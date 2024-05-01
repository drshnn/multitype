import { useEffect } from 'react';
import TypingAltr from './TypingAltr'
import { socket } from '../utils/socket';


function Race() {
    useEffect(() => {
        const s = socket(localStorage.getItem('name') ?? '').connect();
        s.on('connect', () => {
            console.log("user connected");

        })
        s.on('joinedRoom', ({ roomId, users }: { roomId: string, users: string[] }) => {
            console.log("user joined a room with roomId: ", roomId)
            console.log(users)
        })
        return () => {
            s.disconnect()
            s.off('connect')
            s.off('joinedRoom')
        }
    }, [])
    return (
        <div className="w-screen h-screen text-white bg-black p-10 overflow-hidden flex items-center justify-center">
            {/* <Typing /> */}
            <TypingAltr />
        </div>
    )
}

export default Race
