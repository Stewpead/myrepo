var PORT = 7070;
var HOST = '127.0.0.1';
// var HOST = '138.197.110.90';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var tracker = [];

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
	var msg = JSON.parse(message);
	
	console.log(msg);
	
	if(msg["status"])
	{
		if (msg["status"] == 1) 
		{
			// insert to tracker list
			tracker.push(
				{
					public_ip: remote.address,
					public_port: remote.port,
					private_ip: msg["data"]["ip"],
					connected: false
				}
			);
			
			if (tracker.length == 2) 
			{
				for (var i = 0; tracker[i]; ++i) 
				{
					var rt = tracker.slice(0); //Duplicate Tracker
					var nodeInfo = rt.splice(i, 1);
					var mTracker = {};
					mTracker.status = 1;
					mTracker.info = nodeInfo[0]; //since the info is wrap by array index []
					mTracker.peers = rt;

					var msg = JSON.stringify(mTracker);
					console.log('UDP message sent to ' + tracker[i].public_ip +':'+ tracker[i].public_port + " = " + msg + "\n\n");
					
					server.send(msg, 0, msg.length, tracker[i].public_port, tracker[i].public_ip, 
						function(err, bytes) 
						{
							if (err) throw err;
						}
					);
					
					rt.length = 0;
				}
			}
			else if(tracker.length > 2)
			{
				for (var i = 0; tracker[i]; ++i) 
				{
					if(tracker[i].public_ip == remote.address && tracker[i].public_port == remote.port)
					{
						var rt = tracker.slice(0); //Duplicate Tracker
						var nodeInfo = rt.splice(i, 1);
						var mTracker = {};
						mTracker.status = 1;
						mTracker.info = nodeInfo[0]; //since the info is wrap by array index []
						mTracker.peers = rt;

						var msg = JSON.stringify(mTracker);
						console.log('UDP message sent to ' + tracker[i].public_ip +':'+ tracker[i].public_port + " = " + msg + "\n\n");
						
						server.send(msg, 0, msg.length, tracker[i].public_port, tracker[i].public_ip, 
							function(err, bytes) 
							{
								if (err) throw err;
							}
						);
						
						rt.length = 0;
						break;
					}
				}
			}
		}
		else if(msg["status"] == 4)
		{
			var response = {};
			response.status = 4;
			response.data = {};
			response.data.public_port = remote.port;
			response.data.stun_id = msg["data"]["stun_id"];

			var message = JSON.stringify(response);

			server.send(message, 0, message.length, remote.port, remote.address, 
				function(err, bytes) 
				{
					if (err) throw err;
				}
			);
		}
	}
	
});

server.on('error', function(err){
	console.log("Error: " + err.message);
});

server.bind(PORT, HOST);