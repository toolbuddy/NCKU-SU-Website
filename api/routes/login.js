const { Router } = require('express')
const router = Router()
const accountOp= require('../../model/query/account.js')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});
// Import send email object
const nodemailer = require('nodemailer');
const config = require('../../model/config');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
})

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
      if(val == "0"){
        // set session data
        req.session.username = username;
        req.session.isLogin = true;
        res.send(val);
      } else {
        res.send(val);
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
  console.log('logout!!')
  req.session.destroy();
  return res.redirect('/');
})


router.post('/registry',urlencodedParser,(req,res)=>{
  console.log(req.body);
  let username = req.body.username;
  let pwd = req.body.password;
  let name = req.body.name;
  let Email = req.body.email;
  let Valvalid = checkVal(pwd);
  let lengthvalid = checkLength(pwd);
  let options = {
    from: config.email.user,
    to: Email,
    subject: 'Authorization for NCKU-SU',
    text: 'little in in is my teacher'
  }

  transporter.sendMail( options , (error,info) => {
    if(error) console.log(error);
    else console.log('Sending email: ' + info.response);
  })

  if(Valvalid && lengthvalid){
    // connect to mysql code...
    res.send("0");
  }
  else if(Valvalid && (!lengthvalid)){
    res.send("100");// invalid password's length
  }
  else if((!Valvalid) && lengthvalid){
    res.send("200"); // invalid password's char
  }
  else{
    res.send("300"); // invalid password's length and char
  }
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
