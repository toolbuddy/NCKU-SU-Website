const { Router } = require('express')
const router = Router()
const accountOp= require('../../model/query/account.js')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});
const sha1 = require('js-sha1')
const session = require('express-session');

app.get('/',(req,res)=>{
  console.log('123');
  res.end();
})

router.post('/user', urlencodedParser, (req, res) => {
    let username = req.body.username;
    let pwd = req.body.password;
    let Valvalid = checkVal(pwd);
    let lengthvalid = checkLength(pwd);
    let status;

  if(Valvalid && lengthvalid){
    // connect to mysql code...
    accountOp.login(username, pwd)
    .then( val =>{
        // 0 -> success
        // 1 -> wrong password
        // 2 -> wrong account
      status = "0"
      if(status == "0"){
        req.session.username = username;
        req.session.isLogin = true;
      }
    });
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

router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
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
