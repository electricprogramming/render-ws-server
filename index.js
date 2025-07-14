const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS for testing frontend
app.use(cors());

// Optional test route
app.get('/', (req, res) => {
  res.send('WebSocket server is running!');
});

// Create raw HTTP server
const server = http.createServer(app);

// Attach WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.send('Welcome to the WebSocket server!');

  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send(`You said: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the HTTP + WS server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
