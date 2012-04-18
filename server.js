var server = require('http').createServer(handler),
	io = require('socket.io').listen(server),
	fs = require('fs');

server.listen(8080);

function handler (req, res) {
	res.writeHead(200);
	res.end("Connection successful");
}

io.sockets.on('connection', function (socket) {
  /* When a connection is made, send {hello:'world'} */
  var i = setInterval(function() {
	socket.emit('news', { hello: 'world' });
	}, 2000);
  /* When an 'event' string is recieved, run function */
  socket.on('my other event', function (data) {
    console.log(data);
  });
  /* Stop it */
  socket.on('stop it', function() {
	clearInterval(i);
  });
});
