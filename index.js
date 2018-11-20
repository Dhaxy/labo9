var app = require('express')(),
	http = require('http').Server(app),
	express = require('express'),
	io = require('socket.io')(http);


const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/view'));

app.get('/', function(req, res) {
	res.sendFile('view/index.html', {root:__dirname});
});

io.on('connection', function(socket) {
	console.log('Connection');
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function() {
		console.log('Disconnection');
	});
});

http.listen(PORT, function() {
	console.log('Server started http://localhost:' + PORT);
});