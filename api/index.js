const express = require('express');

// Create express instnace
const app = express();

// Require API routes
//const users = require('./routes/test');
//const login = require('./routes/login');
const post = require('./routes/post');

// Import API Routes
//app.use(users);
//app.use(login);
app.use(post);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
