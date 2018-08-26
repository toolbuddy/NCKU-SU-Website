const express = require('express');

// Create express instnace
const app = express();

// Require API routes
const users = require('./routes/test');
const login = require('./routes/login');
const logout = require('./routes/logout');
const registry = require('./routes/registry');
const forget_pwd = require('./routes/forget_pwd');
const change_pwd = require('./routes/change_pwd');
const bighead = require('./routes/bighead');

// Import API Routes
app.use(users);
app.use(login);
app.use(registry);
app.use(logout);
app.use(forget_pwd);
app.use(change_pwd);
app.use(bighead);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
