import { useEffect } from 'react';
import TypingAltr from './TypingAltr'
import { socket } from '../utils/socket';


function Race() {
    useEffect(() => {
        socket.connect();
    }, [])
    return (
        <div className="w-screen h-screen text-white bg-black p-10 overflow-hidden flex items-center justify-center">
            {/* <Typing /> */}
            <TypingAltr />
        </div>
    )
}

export default Race
