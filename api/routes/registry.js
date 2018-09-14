const { Router } = require('express')
const router = Router()
const accountOp= require('../../model/query/account.js')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});
const mail = require('./about/mailer.js');
const crypto = require('./about/crypto.js');
const config = require('../../model/config');

router.post('/registry',urlencodedParser,(req,res)=>{
  const Email = req.body.email;
  const token = crypto.encrypt(Email,"test");
  req.body.token = token;
  // regist time
  const time = Date.now();
  const str = Email + '/' + time;
  //save in database
  accountOp.create(req.body);
  //encrypt
  const passkey = crypto.encrypt(str,"test");
  let options = {
    from: config.email.user,
    to: Email,
    subject: 'Authorization for NCKU-SU',
    text: "激活網址： " + 'http://localhost:3000/api/verify?token=' + passkey
  }

  mail(options);
})


router.get('/verify',(req,res)=>{
  console.log("get token");
  let token = req.query.token;
  //decrypt
  let str = crypto.decrypt(token,"test");
  let Email = str.split('/')[0];
  let time = parseInt(str.split('/')[1]);
  let diffTime = parseInt(Date.now()) - time ;
  //set expired time for 30 mins
  if( diffTime > 1000*60*30 ){
    console.log("Expired!!");
  } else {
    // make user finish
    accountOp.verify(Email);
    console.log("success!!");
  }
  // direct to registry
  return res.redirect('../../account/verification');
})

module.exports = router;