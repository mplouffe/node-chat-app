const socket = io();

socket.on('connect', function() {
    console.log('Connected to server.');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});

socket.on('newMeme', function(data) {
    let formattedTime = moment(data.createdAt).format('h:mm a');
    let template = $('#meme-template').html();
    let html = Mustache.render(template, {
        from: data.from,
        createdAt: formattedTime,
        imageUrl: data.meme.imageUrl,
        imageWidth: data.meme.imageWidth,
        title: data.meme.title,
        description: data.meme.description
    });

    $('#messages').append(html);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    let messageTextbox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

let memeButton = $('#fire-meme');
memeButton.on('click', function(e) {
    memeButton.attr('disabled', 'disabled').text('Firing...');   
    socket.emit('fireMeme', {
        from: 'User'
    }, function() {
      memeButton.removeAttr('disabled').text('Fire Meme');  
    });
});