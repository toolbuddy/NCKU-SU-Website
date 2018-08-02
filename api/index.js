const express = require('express');

// Create express instnace
const app = express();

// import express-session
const session = require('express-session');

// Import connect-session-Sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Require API routes
const users = require('./routes/test');
const login = require('./routes/login');

// Import API Routes
app.use(users);
app.use(login);

// create sequelizestore
const myStore = new SequelizeStore({
  db: 'mydb'
})

// session setting
app.use(session({
  secret: '128 bytes random string',
  store: myStore,
  resave: false,
  saveUninitialized: true,
  cookie: { user: "default" , maxAge: 60 * 1000 } // 1分鐘到期 default:{path:'/',httpOnly:true,secure:false,maxAge:null}
}))
// Auto create session table
myStore.sync();

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
