const express = require('express');
const bodyParser = require('body-parser');

// Create express instnace
const app = express();

// Require API routes
const login = require('./routes/login');
// Config root path
const path = require('path');
global.rootPath = path.join(__dirname + '/../');

// Import API Routes
app.use(login);
app.use(bodyParser.urlencoded({ extended: false }))

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
