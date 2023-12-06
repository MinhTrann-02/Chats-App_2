const io = require('socket.io-client');
const serverURL = 'http://localhost:3000';
const socket = io(serverURL);

socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('send', 'Hello anh Thành');

    socket.on('recive', (data) => {
        console.log(data);
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('error', (error) => {
    console.error('Socket error:', error);
});