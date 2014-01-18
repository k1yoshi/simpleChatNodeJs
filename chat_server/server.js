var express = require('express'),
	app     = express(),
	server  = require('http').createServer(app),
	io		= require('socket.io').listen(server),
	cons	= require('consolidate');

server.listen(3000);
app.get('/', inicio);

function inicio(req, res)
{
	res.send('Server running at localhost:3000');
	console.log('Server running at localhost:3000\n');
}

io.sockets.on('connection', escucharSockets);

function escucharSockets(socket)
{
	socket.on('sendMessage', sendMessage);
	function sendMessage(data)
	{
		socket.broadcast.emit('getMessages', data);
	}
}