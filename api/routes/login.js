const { Router } = require('express')

const router = Router()
const loginOperation = require('../../model/query/login.js')
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

router.post('/user', urlencodedParser, (req, res) => {
    let username = req.body.username;
    let pwd = req.body.password;
    let Valvalid = checkVal(pwd);
    let lengthvalid = checkLength(pwd);
    let status;
    let val;

  if(Valvalid && lengthvalid){
    // connect to mysql code...
    
  }
  else if(Valvalid && (!lengthvalid)){
    status = "100";
  }
  else if((!Valvalid) && lengthvalid){
    status = "200";
  }
  else{
    status = "300";
  }

  res.send(status);
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
    status = "100";
  }
  else if((!Valvalid) && lengthvalid){
    status = "200";
  }
  else{
    status = "300";
  }
  res.send(status);
})

function checkVal(str) {
  var regExp = /^[\d|a-zA-Z]+$/;
  if (regExp.test(str))
      return true;
  else
      return false;
}

function checkLength(str){
  if(str.length >= 8 && str.length <= 20)
    return true
  else
    return false
}


module.exports = router;
