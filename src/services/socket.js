import { io } from "socket.io-client";
import config from "../config.json";

const socket = io(config.serverUrl, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
