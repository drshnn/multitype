import { useEffect, useState } from "react";
import TypingAltr from "./TypingAltr";
import { socket } from "../utils/socket";
import { SocketUser } from "../types/user";
import UserProgress from "./UserProgress";

function Race() {
  const [words, setWords] = useState("");
  const [users, setUsers] = useState<SocketUser[]>([]);
  useEffect(() => {
    const s = socket(localStorage.getItem("name") ?? "").connect();
    s.on("connect", () => {
      console.log("user connected");
    });
    s.on(
      "joinedRoom",
      ({
        roomId,
        users,
        words,
      }: {
        roomId: string;
        users: SocketUser[];
        words: string;
      }) => {
        console.log("user joined a room with roomId: ", roomId);
        console.log(users);
        console.log(words);
        setWords(words);
        setUsers(users);
      }
    );
    s.on("newUserJoined", ({ users }: { users: SocketUser[] }) => {
      setUsers(users);
    });
    s.on("someUserLeft", ({ users }: { users: SocketUser[] }) => {
      setUsers(users);
    });
    s.on('countdown', (time: string) => {
      console.log(time);
    })
    s.on('started', (message: string) => {
      console.log(message);
    })
    return () => {
      s.disconnect();
      s.off("connect");
      s.off("joinedRoom");
    };
  }, []);
  return (
    <div className="w-screen h-screen text-white bg-black p-10 overflow-hidden flex items-center justify-center flex-col gap-5">
      {/* <Typing /> */}

      {users.length > 0 && (
        // <div className="users-count">users joined {users.length}/4</div>
        <UserProgress users={users} />
      )}
      {words !== "" && <TypingAltr wordList={words} />}
    </div>
  );
}

export default Race;
