const {Router} = require('express');
const router = Router()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});
const mail = require('./about/mailer.js');
const crypto = require('./about/crypto.js');
const config = require('../../model/config');
const accountOp = require('../../model/query/account');

router.post('/change_pwd',urlencodedParser,(req , res) => {
  const username = req.body.username;
  const pwd = req.body.pwd;
  const new_pwd = req.body.new_pwd;
  console.log(pwd)
  accountOp.login(username, pwd)
  .then(val => {
    /*
     * status code
     * 0  -> success, no admin
     * 1  -> success, with admin
     * -1 -> wrong username or password
     */
    // TODO: need to get the permission from operation result.
    if( val === 0 || val === 1){
      // change password
      accountOp.changepwd(username,new_pwd);
      console.log("has changed password");
      // remove local cookie.
      res.clearCookie('connect.sid');
      // remove the server store cookie.
      req.session.destroy();
      res.end();
    } else {
      console.log("error password");
      res.send("error password");
    }
  })
  .catch((err) => {
    console.log(err);
  })
})

module.exports = router;