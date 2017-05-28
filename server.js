var express = require('express');
var server = express();
var httpServer = require('http').Server(server);
var io = require('socket.io')(httpServer);


var port = 8083;

server.use(
  express.static(__dirname + '/public')
);

server.get('/', function (request, response) {
  response.sendfile('index.html');
});

io.on('connection', function (socket) {

  console.log(socket.conn.remoteAddress + ' connected!');

  socket.emit('message', {
    cls: 'system',
    name:'Bot',
    time:new Date(),
    msg: "\n\nWelcome! This is the MOTD or something\nServer time is "+(new Date())
  });

  socket.on('message_sent', function (data) {
    if(data.msg && data.msg.trim() !== '') {
      io.emit('message', Object.assign({time: new Date()}, data));
    }
  });

  socket.on('disconnect', function (data) {
    if (!socket.Username)return;
    delete users[socket.Username];
    updateNicknames();
  });

});

httpServer.listen(port, function () { console.log('Listening on port '+port); });
