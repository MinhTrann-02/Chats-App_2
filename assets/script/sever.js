// const express = require('express');
// const { createServer } = require('node:http');
// const { Server } = require('socket.io');
// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// io.on('connection', (socket) => {
//     console.log('Có người kết nối');

//     socket.on('send', (data) => {
//         console.log(data);
//         socket.emit('recive', 'Dissss, chào em Minh');
//     });

//     socket.on('disconnect', () => {
//         console.log('Người dùng ngắt kết nối');
//     });
// });

// server.listen(3000, () => {
//     console.log('server running at http://localhost:3000');
// });