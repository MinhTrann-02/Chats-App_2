const { io } = require("socket.io-client");

const uri = "http://192.168.1.10:3000";
const socket = io(uri);
const message = "baby kajima";
const iconOptions = ["🙂", "😭", "😍", "😂", "👍", "👎"];

const data = {
    username: 'User123',
    avatarOption: '1',
    msg: iconOptions[2] 
    // msg: message
};

socket.on("userConnected", (userDataInput) => {
    console.log(userDataInput);
});

socket.on("receive", (data) => {
    console.log(data);
});

socket.emit('register', data);
socket.emit('send', data);
// socket.emit('send', message);
