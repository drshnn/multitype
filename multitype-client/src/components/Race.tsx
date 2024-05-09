import { useEffect, useState } from "react";
import TypingAltr from "./TypingAltr";
import { socket } from "../utils/socket";
import { SocketUser, SocketUserWithProgress } from "../types/user";
import UserProgress from "./UserProgress";
import { Progress } from "../types/Progress";
import { Socket } from "socket.io-client";

function Race() {
  const [words, setWords] = useState("");
  const [users, setUsers] = useState<SocketUser[]>([]);
  const [currentUser, setCurrentUser] = useState<SocketUser>({} as SocketUser)
  const [usersProgress, setUsersProgress] = useState<SocketUserWithProgress>({})
  const [s, setS] = useState({} as Socket);

  useEffect(() => {
    setS(() => socket(localStorage.getItem("name") ?? "").connect());

  }, []);
  useEffect(() => {
    if (Object.keys(s).length !== 0) {
      s.on("connect", () => {
        console.log("user connected");
      });
      s.on(
        "joinedRoom",
        ({
          roomId,
          users,
          words,
          currentUser
        }: {
          roomId: string;
          users: SocketUser[];
          words: string;
          currentUser: SocketUser
        }) => {
          console.log("user joined a room with roomId: ", roomId);
          console.log(users);
          console.log(words);
          setWords(words);
          setUsers(users);
          setCurrentUser(currentUser)
          console.log(currentUser);

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
      s.on('started', (init: Progress[]) => {
        console.log(init)
        const progress: SocketUserWithProgress = {}
        init.forEach(i => { progress[i.id] = i })
        setUsersProgress(progress)
      })
      s.on('progress', (userProgress: Progress) => {
        setUsersProgress(prev => { return { ...prev, [userProgress.id]: userProgress } })
      })
    }
  }, [s])
  return (
    <div className="w-screen h-screen text-white bg-black p-10 overflow-hidden flex items-center justify-center flex-col gap-5">
      {/* <Typing /> */}

      {users.length > 0 && (
        // <div className="users-count">users joined {users.length}/4</div>
        <UserProgress users={users} progress={usersProgress} />
      )}
      {words !== "" && Object.keys(s).length !== 0 && Object.keys(currentUser).length !== 0 && <TypingAltr wordList={words} socket={s} currentUser={currentUser} />}
    </div>
  );
}

export default Race;
