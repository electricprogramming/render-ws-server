const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('WebSocket server is running with broadcast support!');
});
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

setInterval(() => fetch('https://render-com-test.vercel.app/ping'), 270000);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Broadcast to all clients except sender
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send('✅ Connected to broadcast WebSocket server');

  ws.on('message', (message) => {
    console.log('Broadcasting:', message);

    // Send to all other connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`📢 Broadcast: ${message}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
