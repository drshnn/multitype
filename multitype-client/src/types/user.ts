import { Progress } from "./Progress";

export interface SocketUser {
  username: string;
  id: number;
}
export interface SocketUserWithProgress {
  [key: number]: Progress
}
