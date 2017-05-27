var express = require('express');
var server = express();
var httpServer = require('http').Server(server);
var io = require('socket.io')(httpServer);

var ip = "127.0.0.1";
var port = 8083;varusers = {};

server.use(
  express.static(__dirname + '/public')
);

server.get('/', function (req, res) {
  res.sendfile('index.html');
});

io.on('connection', function (socket) {

  console.log(socket.conn.remoteAddress + ' connected!');

  io.emit('message', {
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

httpServer.listen(port, ip, function () { console.log('Listening on port '+port); });
