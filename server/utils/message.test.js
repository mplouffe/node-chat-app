const expect = require('expect');
const {generateMessage, generateMeme, createMeme} = require('./message');
const cheerio = require('cheerio');

describe('MESSAGE TESTS', () => {
    describe('generateMessage', () => {
        it('should generate correct message object', () => {
            let from = 'John';
            let text = 'Test text.';
            let message = generateMessage(from, text);
            expect(message).toMatchObject({ from, text });
            expect(typeof message.createdAt).toBe('number');
        });
    });

    describe('generateMeme', () => {
        it('should generate correct meme message', () => {
            let from = "John";
            let memeObject = "John's meme info";
            meme = generateMeme(from, memeObject);
            expect(meme.from).toBe(from);
            expect(meme.meme).toBe(memeObject);
            expect(typeof meme.createdAt).toBe('number');
        });
    });

    describe('createMeme', () => {
        let cheerioMock;
        let memeTitle = 'Meme Title';
        let memeDescription = 'Meme Description';
        let imageHeight = 1000;
        let imageWidth = 2000;
        let imageUrl = 'imageUrl';

        beforeEach(() => {
            cheerioMock = cheerio.load(`
            <meta property='og:title' content='${memeTitle}' />
            <meta property='og:description' content='${memeDescription}' />
            <meta property='og:image' content='${imageUrl}' />
            <meta property='og:image:width' content='${imageWidth}' />
            <meta property='og:image:height' content='${imageHeight}' />`);
        });

        it('should generate meme object from reference passed in', () => {
            let meme = createMeme(cheerioMock);

            expect(meme).toMatchObject({
                title: memeTitle,
                description: memeDescription,
                imageWidth: 300,
                imageHeight: 150,
                imageUrl: imageUrl
            });
        });
    });
});