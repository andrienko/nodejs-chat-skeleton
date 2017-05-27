var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var ip = "127.0.0.1";
//var ip = "*.*.*.*";
var port = 8083;
var users = {};

app.use(
  express.static(__dirname + '/public')
);

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

io.on('connection', function (socket) {

  console.log('Someone connected!', socket.conn.remoteAddress);

  io.emit('message', {
    cls: 'system',
    name:'Bot',
    time:new Date(),
    msg: "Welcome! This is the MOTD or something\nWelcome, again."
  });

  socket.on('message_sent', function (data) {
    io.emit('message', Object.assign({time:new Date()},data));
  });

  socket.on('disconnect', function (data) {
    if (!socket.Username)return;
    delete users[socket.Username];
    updateNicknames();
  });

});

http.listen(port, ip, function () {
  console.log('listening on *:'+port);
});
