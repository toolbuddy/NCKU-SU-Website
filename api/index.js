const express = require('express');
const bodyParser = require('body-parser');

// Create express instnace
const app = express();

// Require API routes
const post = require('./routes/post')
const login = require('./routes/login');
const logout = require('./routes/logout');
const registry = require('./routes/registry');
const forget_pwd = require('./routes/forget_pwd');
const change_pwd = require('./routes/change_pwd');
const bighead = require('./routes/bighead');
const getMessage = require('./routes/getMessage')
const getMessageSum = require('./routes/getMessageSum')
const getTopnews = require('./routes/getTopnews')
const getTopnewsSum = require('./routes/getTopnewsSum')
const uploadFile = require('./routes/uploadFile')
// Config root path
const path = require('path');
global.rootPath = path.join(__dirname + '/../');

// Import API Routes
app.use(login);
app.use(registry);
app.use(logout);
app.use(forget_pwd);
app.use(change_pwd);
app.use(bighead);
app.use(post);
app.use(getMessage);
app.use(getTopnews);
app.use(uploadFile);
app.use(getMessageSum);
app.use(getTopnewsSum);

app.use(bodyParser.urlencoded({ extended: false }))

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
