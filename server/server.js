// server.js - Simple Static Server

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS, images)
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   Server Running! ✓                   ║
╠═══════════════════════════════════════╣
║                                       ║
║   Open: http://localhost:${PORT}        ║
║                                       ║
╚═══════════════════════════════════════╝
  `);
});