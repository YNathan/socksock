const env = 'def-deposits-2.features4.kwiff.org'
const socketUrl = `wss://${env}/socket.io/?device=web-app&version=1.0.0&identifier=f5c7ccad-c4a3-44df-9830-fe2c09f0096f&EIO=3&transport=websocket`;
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

    connection.on('httpResponse', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    const msg = [
        "command",
        {
            "message": "wallet:currency",
            "payload": {
                "isoAlphabeticCode": "GBP"
            }
        }
    ]
    sendCommand(connection, msg);
});

client.connect(socketUrl, 'echo-protocol');

function sendCommand(connection,msg) {
    if (connection.connected) {
        connection.sendUTF(msg);
        
        setTimeout(()=> {
            sendCommand(connection, msg);
            console.log('sended')
        }, 1000);
       
    }
}

setTimeout(()=>console.log('done'), 20000)
