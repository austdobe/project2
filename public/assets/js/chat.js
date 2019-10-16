const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
io.on('connection', (socket) => {
  console.log('New user connected');
});

const chat = function() {
// make connection
  const socket = io.connect('http://localhost:3333')

  // buttons and inputs
  const username = $('#username');
  const feedback = $("#feedback")
  const message = $('#message');
  const send_message = $('#send_message');
  const chatArea = $('#chatArea');

  // Emit message
  send_message.click(function () {
    socket.emit('new_message', { message: message.val() });
  });

  // Listen on new_message
  socket.on('new_message', (data) => {
    message.val('');
    chatArea.append('<p class="message">' + data.username + ':'  + data.message + '</p>');
  });

  // Emit typing
  message.bind('keypress', () => {
    socket.emit('typing');
  });

  // Listen on typing
  socket.on('typing', (data) => {
    feedback.html('<p><i>' + data.username + ' is typing a message...' + '</i></p>');
  });
};

module.exports = chat;