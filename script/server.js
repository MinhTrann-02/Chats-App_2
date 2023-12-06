const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

const userDataInput ={userName: '' , avatarOption: ''};

io.on('connection', (socket) => {
    console.log(`User connected`);

    socket.on('register', (userDataInput) => {
        console.log(`User registered: ${userDataInput.userName}`);
        socket.userDataInput = userData;
        io.emit('userConnected', `${userDataInput.userName} connected`);
    });

    socket.on('send', (data) => {
        // console.log(`${socket.userDataInput.userName} sent a message: ${data.msg}`);
        // io.emit('receive', { userName: socket.userDataInput.userName, msg: data.msg });
        console.log(data)
        io.emit('receive', data)
    });

    // socket.on('disconnect', () => {
    //     console.log(`User ${socket.userData.userName} disconnected`);
    // });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
    console.log('konichiwa')
});
