const { Router } = require('express')
const router = Router()
const accountOp= require('../../model/query/account.js')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});

router.post('/login', urlencodedParser, (req, res) => {
  const username = req.body.username;
  const pwd = req.body.password;
  // connect to mysql
  accountOp.login(username, pwd)
  .then(val => {
    /*
     * status code
     * 0  -> success, no admin
     * 1  -> success, with admin
     * -1 -> wrong username or password
     */
    // TODO: need to get the permission from operation result.
    const result = {
      status: !(val === -1),    // only -1 represents login failure
      authUser: val !== -1 ? username : null,
      isLogin: val !== -1,
      role: val // permission role
    }
    if (val === 0 || val === 1) {
      // set session data
      req.session.authUser = username
      req.session.isLogin = true
      req.session.role = val
    }
    res.json(result)
  });
})

module.exports = router;