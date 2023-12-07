const { io } = require("socket.io-client");

const uri = "http://172.16.1.41:3000";
const socket = io(uri);
const message = "";
const data = {
    username: 'User123',
    avatarOption: '1',
    msg: message
};

socket.on("userConnected", (userDataInput) => {
    console.log(userDataInput);
});

socket.on("receive", (data) => {
    console.log(data);
});

socket.emit('register', data );
socket.emit('send', data);
// socket.emit('disconnect', data )
// socket.emit('send','Minh bede');
