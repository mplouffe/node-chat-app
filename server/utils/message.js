const moment = require('moment');

const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

const generateMeme = (from, meme) => {
    return {
        from,
        meme,
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage, generateMeme};