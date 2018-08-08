const { Router } = require('express')
const router = Router()
const accountOp= require('../../model/query/account.js')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});

router.post('/login', urlencodedParser, (req, res) => {
  let username = req.body.username;
  let pwd = req.body.password;
  // connect to mysql
  accountOp.login(username, pwd)
  .then(val => {
    // set session data
    req.session.username = username;
    req.session.isLogin = true;
    res.send(username)
  });
})

// logout
router.get('/logout',(req,res) => {
  console.log('logout!!')
  // remove local cookie.
  res.clearCookie('connect.sid');
  // remove the server store cookie.
  req.session.destroy();
  return res.redirect('/');
})

router.post('/registry',urlencodedParser,(req,res)=>{
  console.log(req.body);
  let username = req.body.username;
  let pwd = req.body.password;
  let name = req.body.name;
  // TODO: write the registry data to database.
})

module.exports = router;
