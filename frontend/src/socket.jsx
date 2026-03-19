import { io } from "socket.io-client";

const socket = io("https://chat-application-ga08.onrender.com");

export default socket;