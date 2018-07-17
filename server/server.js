const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const axios = require('axios');
const cheerio = require('cheerio');

const {generateMessage, generateMeme, createMeme} = require('./utils/message');
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

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('fireMeme', (message, callback) => {

        axios.get('https://knowyourmeme.com/random')
            .then((res) => {
                let meme = createMeme(cheerio.load(res.data));
                io.emit('newMeme', generateMeme(message.from, meme));
                callback();
            })
            .catch(e => {
                console.log('Error fetching meme. ', e);
                callback();
            });
    });
});

app.use(express.static(publicPath));

server.listen(port, (err) => {
    console.log(`App is up on localhost:${port}`);
});
