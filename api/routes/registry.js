const { Router } = require('express')
const router = Router()
const accountOp= require('../../model/query/account.js')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});
const mail = require('./mailer.js');
const crypto = require('crypto');
const config = require('../../model/config');

router.post('/registry',urlencodedParser,(req,res)=>{
  console.log(req.body);
  const username = req.body.username;
  const pwd = req.body.password;
  const name = req.body.name;
  const Email = req.body.email;
  const college = req.body.college;
  const department = req.body.department;
  const grade = req.body.grade;
  // regist time 
  const time = Date.now();
  const str = Email + '/' + time;
  //save in database
  accountOp.create(req.body);
  //encrypt
  const passkey = encrypt(str,"test");
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
  let str = decrypt(token,"test");
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
  return res.redirect('../../account/registry');
})

function encrypt (str,secret) {
  let cipher = crypto.createCipher('aes192' , secret);
  let enc = cipher.update(str,'utf8','hex');
  enc += cipher.final('hex');
  return enc;
}

function decrypt (str,secret) {
  let decipher = crypto.createDecipher('aes192' , secret);
  let dec = decipher.update(str,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = router;