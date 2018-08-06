const express = require('express');

// Create express instnace
const app = express();

// import express-session
const session = require('express-session');

//Import sequelize
const database = require('../model/sqldb');
const sequelize = database.sequelize;

// Import connect-session-Sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// create sequelizestore
const myStore = new SequelizeStore({
  db: sequelize
})

// session setting
app.use(session({
  secret: '128 bytes random string', //will change it to another string in future
  store: myStore,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600 * 1000 } // 10分鐘到期 default:{path:'/',httpOnly:true,secure:false,maxAge:null}
}))

// Require API routes
const users = require('./routes/test');
const login = require('./routes/login');

//Judge whether login or not
app.get('/',(req,res,next) => {
  if(req.session.isLogin){
    console.log("online");
  } else {
    console.log("Unlogin");
  }
  req.send(req.session.isLogin); //true or false
})

// Import API Routes
app.use(users);
app.use(login);

// Auto create session table
myStore.sync();

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
