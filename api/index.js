const express = require('express');

// Create express instnace
const app = express();

// Require API routes
const users = require('./routes/test');
const login = require('./routes/login');
const registry = require('./routes/registry');

// Import API Routes
app.use(users);
app.use(login);
app.use(registry);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
