const io = require("socket.io-client");

const socket = io("https://fe5187b3b82082.lhr.life", {
    // transports: ["websocket"],
    // upgrade: false,
    // reconnection: true,
    // reconnectionDelay: 1000,
    // reconnectionAttempts: 10,
    // timeout: 10000,
    // autoConnect: true,
    // forceNew: true,
    // rejectUnauthorized: false,
    extraHeaders: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "*",
        
    },
});
export default socket;