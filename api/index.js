const express = require('express');

// Create express instnace
const app = express();

// Require API routes
const users = require('./routes/test');
const login = require('./routes/login');

// Import API Routes
app.use(users);
app.use(login);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
