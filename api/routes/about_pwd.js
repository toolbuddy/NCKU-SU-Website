const {Router} = require('express');
const router = Router()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});
const mail = require('./mailer');
const crypto = require('./crypto.js');
const config = require('../../../model/config');
const accountOp = require('../../model/query/account.js');

router.post('/forget_pwd',urlencodedParser,(req , res) => {
  let Email;
  const user = req.body.username;
  // send email time 
  const time = Date.now();
  const str = user + '/' + time;
  //encrypt
  const passkey = crypto.encrypt(str,"test");
  // query email from database with username...

  let options = {
    from: config.email.user,
    to: Email,
    subject: 'Forget password for NCKU-SU',
    text: "驗證網址： " + 'http://localhost:3000/api/verify_forget_pwd?token=' + passkey
  }
  mail(options);
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
  if( diffTime > 1000*60*30 ){
    console.log("Expired!!");
    // direct to 驗證碼失效
    return res.redirect('../../account/registry');
  } else {
    // direct to change password
    console.log("success!!");
    return res.redirect('../../account/registry');
  }
})

router.post('/change_pwd',urlencodedParser,(req , res) => {
  const username = 'chia';
  const pwd = req.body.pwd;
  const new_pwd = req.body.new_pwd;

  accountOp.login(username, pwd)
  .then(val => {
    /*
     * status code
     * 0  -> success, no admin
     * 1  -> success, with admin
     * -1 -> wrong username or password
     */
    // TODO: need to get the permission from operation result.
    if( val === '0' || val === '1'){
      // change password code ...

    } else {
      console.log("error password");
    }
  })
  .catch((err) => {
    console.log(err);
  })
})