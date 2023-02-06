const io = require("socket.io-client");

const socket = io("https://18.181.208.74:3002");
export default socket;