import io from "socket.io-client";

const socket = io.connect("https://ede3-14-139-38-180.in.ngrok.io");
export default socket;