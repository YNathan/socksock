const env = 'web-api.dsds.com'
const socketUrl = `wss://${env}/socket.io/?device=web-app&version=1.0.0&identifier=ce0caec5e6eb57f4d7772458b81ffc69&EIO=3&transport=websocket`;
var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    const msg = {
        payload: {
            appScreen: 1
        },
        appScreen: 1
    }
    sendCommand(connection, "promotions:get", msg);
});

client.connect(socketUrl, 'echo-protocol');

function sendCommand(connection, command, body) {
    if (connection.connected) {
        const msg = {
            message: command,
            ...body
        }

        connection.sendUTF(msg);
        setTimeout(()=> sendCommand(connection, command, body), 1000);
    }
}

setTimeout(()=>console.log('done'), 20000)