const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });

    socket.on('createMessage', (newMessage) => {
        console.log('NewMessage: ', newMessage);
    });

    socket.emit('newMessage', {
        from: 'John',
        text: 'see you then',
        createdAt: 123123
    });
});

app.use(express.static(publicPath));

server.listen(port, (err) => {
    console.log(`App is up on localhost:${port}`);
});
