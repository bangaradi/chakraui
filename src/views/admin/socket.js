const io = require("socket.io-client");

const socket = io.connect("https://ede3-14-139-38-180.in.ngrok.io", {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});
export default socket;