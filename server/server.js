const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const axios = require('axios');
const cheerio = require('cheerio');

const {generateMessage, generateMeme} = require('./utils/message');
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
                let $ = cheerio.load(res.data);
                let meme = {};
                let imageWidth = parseInt($("meta[property='og:image:width']").attr('content'));
                meme.title = $("meta[property='og:title']").attr('content');
                meme.description = $("meta[property='og:description']").attr('content');
                meme.imageWidth = imageWidth < 300 ? imageWidth : 300;
                meme.imageUrl = $("meta[property='og:image']").attr('content');
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
