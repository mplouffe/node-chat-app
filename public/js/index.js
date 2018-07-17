const socket = io();

socket.on('connect', function() {
    console.log('Connected to server.');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let li = $('<li></li>');
    li.text(message.from + " " + formattedTime + ": " + message.text);

    $('#messages').append(li);
});

socket.on('newMeme', function(data) {
    let formattedTime = moment(data.createdAt).format('h:mm a');
    let li = $('<li></li>');
    li.text(data.from + " " + formattedTime + ": ");
    let img = $('<img />', {
        src: data.meme.imageUrl
    });
    li.append(img);

    $('#messages').append(li);
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