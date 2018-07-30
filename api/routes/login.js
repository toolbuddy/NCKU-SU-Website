const { Router } = require('express')

const router = Router()
const accountOp = require('../../model/query/account.js')
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

/* GET user listing. */
router.post('/user', urlencodedParser, (req, res) => {
  let username = req.body.username;
  let pwd = req.body.password;
  let status;

  accountOp.login(username, pwd)
  .then( val =>{
    // 0 -> success
    // 1 -> wrong password
    // 2 -> wrong account
    res.send(val);
  });

})

module.exports = router;
