const websocket = require("ws");
const express = require('express');
const app = express()

const server = app.listen(8080)



const wss = new websocket.Server({
  noServer: true,
})


// connecting to the client and echo msg

wss.on('connection', function(ws){
    wss.on('message', function(data){
      ws.client.forEach(function each(client){
        if(client.readystate === WebSocket.OPEN) {
          client.send(data);
        }
      })
    })
})


// verify client using upgrade method
server.on('upgrade', async function upgrade(request, socket, head) {
  // Do what you normally do in `verifyClient()` here and then use
  // `WebSocketServer.prototype.handleUpgrade()`.

  // test for authentication
  
  return socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii')

  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request, ...args);
  });
});