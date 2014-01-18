$(document).on('ready', inicioChat);

function inicioChat()
{
	var url_server = 'http://localhost:3000';
	window.client = io.connect(url_server);
	window.client.on('getMessages', getMessages);

	$('#btn_enviar').on('click', sendMessage);

	function getMessages(data)
	{
		agregarMessage(data.nick, data.message, false);
	}
	function sendMessage(event)
	{
		var nick, message;
		nick = $('#txt_nick').val();
		if(nick.trim() == '')
		{
			alert('Debe ingresar un nick valido para poder\nenviar un mensaje');
			return;
		}
		message = $('#txt_mensaje').val();
		agregarMessage(nick, message, true);
		var mensaje = 
		{
			'nick': nick,
			'message': message
		}
		window.client.emit('sendMessage', mensaje);
	}	
	function agregarMessage(nick, message, yo)
	{
		yo = yo || false;
		var strong_nick, fieldset, label_message;
		strong_nick = $('<strong/>').text(nick).addClass('nick');
		if(yo == true)
			strong_nick.addClass('yo');
		fieldset = $('<fieldset/>');
		label_message = $('<label/>').text(message);

		fieldset.append(label_message);

		$('.mensajes').append(strong_nick).append(fieldset);
		$('#txt_mensaje').val('');
		var n1, n2;
		n1 = $('.mensajes *').css('height');
		n1 = n1.substring(0, n1.length -2);
		n2 = ('.mensajes *').length;
		$('.mensajes').scrollTop(n1 * n2);
	}
}
