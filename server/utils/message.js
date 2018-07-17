const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

const generateMeme = (from, meme) => {
    return {
        from,
        meme,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage, generateMeme};