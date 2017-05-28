var express = require('express');
var server = express();
var httpServer = require('http').Server(server);
var io = require('socket.io')(httpServer);
var path = require('path');

var Chat = require('./chat.js');
var Connection = require('./connection.js');

var port = 8083;

server.use( express.static(path.resolve(__dirname , '../public') ));
server.get('/', function (request, response) { response.sendFile('index.html'); });

var chat_app = new Chat(io);

io.on('connection', function (socket) {

  var connection = new Connection(socket);
  chat_app.connected(connection);

  socket.on('message_sent', function (data) {
    chat_app.incomming_message(connection,data);
  });

  socket.on('disconnect', function () {
    chat_app.disconnected(socket);
  });

});

httpServer.listen(port, function () {
  console.log('Listening on port '+port);
});
