const {Router} = require('express');
const router = Router()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});
const mail = require('./about/mailer.js');
const crypto = require('./about/crypto.js');
const config = require('../../model/config');
const accountOp = require('../../model/query/account');

router.post('/forget_pwd',urlencodedParser,(req , res) => {
  let Email;
  let options;
  const user = req.body.username;
  // send email time 
  const time = Date.now();
  const str = user + '/' + time;
  //encrypt
  const passkey = crypto.encrypt(str,"test");
  // query email from database with username
  accountOp.getEmail(user)
  .then((val)=>{
    console.log(val);
    Email = val;
    options = {
      from: config.email.user,
      to: Email,
      subject: 'Forget password for NCKU-SU',
      text: "驗證網址： " + 'http://localhost:3000/api/verify_forget_pwd?token=' + passkey
    }
    mail(options);
    res.end();
  })
  .catch((err)=>{
    console.log(err);
  })
})

router.get('/verify_forget_pwd',(req,res)=>{
  console.log("get token");
  let token = req.query.token;
  //decrypt
  let str = crypto.decrypt(token,"test");
  let user = str.split('/')[0];
  let time = parseInt(str.split('/')[1]);
  let diffTime = parseInt(Date.now()) - time ;
  //set expired time for 30 mins
  if( diffTime > 1000*60*15 ){
    console.log("Expired!!");
    // direct to 驗證碼失效
    return res.redirect('../../account/registry');
  } else {
    // direct to change password
    console.log("success!!");
    res.locals.modify = {};
    res.locals.modify.username = user;
    return res.redirect('../../account/changePassowrd');
  }
})

router.post('/verified_change_pwd',urlencodedParser,(req,res)=>{
  const username = req.modify.username;
  const new_pwd = req.body.new_pwd;
  accountOp.changepwd(username,new_pwd);
  console.log("has changed password")
  res.end();
})

module.exports = router;