const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has entered.'));

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });

    socket.on('createMessage', (message) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
    });
});

app.use(express.static(publicPath));

server.listen(port, (err) => {
    console.log(`App is up on localhost:${port}`);
});
