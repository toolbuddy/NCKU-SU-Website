const express = require('express');
const bodyParser = require('body-parser');

// Create express instnace
const app = express();

// Require API routes
const post = require('./routes/post');
const getMessage = require('./routes/getMessage');
const getTopnews = require('./routes/getTopnews');
const getMessageSum= require('./routes/getMessageSum');
const getTopnewsSum= require('./routes/getTopnewsSum');
// Config root path
const path = require('path');
global.rootPath = path.join(__dirname + '/../');

// Import API Routes
app.use(post);
app.use(getMessage);
app.use(getTopnews);
app.use(getMessageSum);
app.use(getTopnewsSum);
app.use(bodyParser.urlencoded({ extended: false }))

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
