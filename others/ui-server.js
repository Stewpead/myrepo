var PORT = 7070;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () 
{
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) 
{
    console.log(remote.address + ':' + remote.port +' - ' + message);
	var msg = JSON.parse(message);


});

server.on('error', function(err){
	console.log("Error: " + err.message);
});

server.bind(PORT, HOST);