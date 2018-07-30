const express = require('express');

// Create express instnace
const app = express();

// Require API routes
const users = require('./routes/test');
const login = require('./routes/login');
const post = require('./routes/post');
// Config root path
const path = require('path');
global.rootPath = path.join(__dirname + '/../');

// Import API Routes
app.use(users);
app.use(login);
app.use(post);
app.use(express.urlencoded());

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
