const ioClient = require('socket.io-client');
const socket = ioClient('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to the server');
    socket.emit('register', { userName: 'TestUser', avatarOption: 'Option1' });
});

socket.on('userConnected', (message) => {
    console.log(`Server says: ${message}`);
});

socket.on('receive', (data) => {
    console.log(`Received message from ${data.userName}: ${data.msg}`);
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});

socket.emit("chat" , "hello");