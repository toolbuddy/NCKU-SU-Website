const { Router } = require('express')
const router = Router()
const accountOp= require('../../model/query/account.js')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});

router.post('/login', urlencodedParser, (req, res) => {
    var username = req.body.username;
    let pwd = req.body.password;
    let Valvalid = checkVal(pwd);
    let lengthvalid = checkLength(pwd);

  if(Valvalid && lengthvalid){
    // connect to mysql
    accountOp.login(username, pwd)
    .then( val =>{
        // 0 -> success
        // 1 -> wrong password
        // 2 -> wrong account
      if(1){
        // set session data
        req.session.username = username;
        req.session.isLogin = true;
        res.send("0");
      }
    });
  }
  else if(Valvalid && (!lengthvalid)){
    // invalid password's length
    res.send("100");
  }
  else if((!Valvalid) && lengthvalid){
    // invalid password's char
    res.send("200");
  }
  else{
    // invalid password's length and char
    res.send("300");
  }
})

// logout
router.get('/logout',(req,res) => {
  req.session.destroy();
  res.end();
})


router.post('/registry',urlencodedParser,(req,res)=>{
  console.log(req.body);
  let username = req.body.username;
  let pwd = req.body.password;
  let name = req.body.name;
  let Valvalid = checkVal(pwd);
  let lengthvalid = checkLength(pwd);
  let status;

  if(Valvalid && lengthvalid){
    // connect to mysql code...
    status = "0"
  }
  else if(Valvalid && (!lengthvalid)){
    status = "100"; // invalid password's length
  }
  else if((!Valvalid) && lengthvalid){
    status = "200"; // invalid password's char
  }
  else{
    status = "300"; // invalid password's length and char
  }
  res.send(status);
})

const checkVal = (str) => {
  var regExp = /^[\d|a-zA-Z]+$/;
  if (regExp.test(str))
      return true;
  else
      return false;
}

const checkLength = (str) => {
  if(str.length >= 8 && str.length <= 20)
    return true
  else
    return false
}


module.exports = router;
