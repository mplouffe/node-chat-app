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

const createMeme = ($) => {
    let imageWidth = parseInt($("meta[property='og:image:width']").attr('content'));
    let imageHeight = parseInt($("meta[property='og:image:height']").attr('content'));
    let ratio = imageWidth/imageHeight;
    let newWidth = imageWidth < 300 ? imageWidth : 300;
    let newHeight = Math.round(newWidth/ratio);
    return {
        title: $("meta[property='og:title']").attr('content'),
        description: $("meta[property='og:description']").attr('content'),
        imageWidth: newWidth,
        imageHeight: newHeight,
        imageUrl: $("meta[property='og:image']").attr('content')
    };
}

module.exports = {generateMessage, generateMeme, createMeme};