const express = require('express');
const bodyParser = require('body-parser');

// Create express instnace
const app = express();

// Require API routes
const post = require('./routes/post');
const getMessage = require('./routes/getMessage');
const getTopnews = require('./routes/getTopnews');
const Message_sum= require('./routes/Message_sum');
const Topnews_sum= require('./routes/Topnews_sum');
// Config root path
const path = require('path');
global.rootPath = path.join(__dirname + '/../');

// Import API Routes
app.use(post);
app.use(getMessage);
app.use(getTopnews);
app.use(Message_sum);
app.use(Topnews_sum);
app.use(bodyParser.urlencoded({ extended: false }))

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
