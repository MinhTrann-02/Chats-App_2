const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: true,
        credentials: true
    }
});
const userDataInput = {
    name: '',
    avatar:'',
    msg: ''
};

const iconOptions = ["🙂", "😭", "😍", "😂", "👍", "👎"];

io.on('connection', (socket) => {
    console.log(`User connected`);

    socket.on('register', (userDataInput) => {
        console.log(`User registered: ${userDataInput.usernamename}`);
        io.emit('userConnected', `${userDataInput.username} connected`);
    });

    socket.on('send', (data) => {
        console.log(data,socket.id)
        // io.emit('receive', {id:socket.id,data})
        if (iconOptions.includes(data)) {
            io.emit('receive', { id: socket.id, type: 'icon', content: data });
        }
        else {
            io.emit('receive', { id: socket.id, type: 'text', content: data });
        }
    });

    // socket.on('disconnect', (user) => {
    //     console.log(`User ${socket.userData.userName} disconnected`);
    // });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

