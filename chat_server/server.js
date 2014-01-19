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

//nos ponemos a la escucha de nuevos sockets
io.sockets.on('connection', escucharSockets);

function escucharSockets(socket)
{
	//en caso de recibi un mensaje de parte del cliente le enviamos el eventos a todos los clientes
	socket.on('sendMessage', sendMessage);
	function sendMessage(data)
	{
		//aca le enviamos los datos a la funcion en el cliente con el nombre de "getMessages"
		socket.broadcast.emit('getMessages', data);
	}
}