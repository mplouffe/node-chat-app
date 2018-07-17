const socket = io();

function scrollToBottom() {
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');

    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    let params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if(err){
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No errror.');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

socket.on('updateUserList', function(users) {
    let ol = $('<ol></ol>');
    users.forEach(function (user) {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
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
    scrollToBottom();
});

socket.on('newMeme', function(data) {
    let formattedTime = moment(data.createdAt).format('h:mm a');
    let template = $('#meme-template').html();
    let html = Mustache.render(template, {
        from: data.from,
        createdAt: formattedTime,
        imageUrl: data.meme.imageUrl,
        imageHeight: data.meme.imageHeight,
        title: data.meme.title,
        description: data.meme.description
    });

    $('#messages').append(html);
    scrollToBottom();
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    let messageTextbox = $('[name=message]');
    socket.emit('createMessage', {
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