import { useEffect } from 'react';
import TypingAltr from './TypingAltr'
import { socket } from '../utils/socket';


function Race() {
    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            console.log(socket.id)
        })
        socket.on('userAdded', (data) => {
            console.log(data.userCount)
        })
    }, [])
    return (
        <div className="w-screen h-screen text-white bg-black p-10 overflow-hidden flex items-center justify-center">
            {/* <Typing /> */}
            <TypingAltr />
        </div>
    )
}

export default Race
