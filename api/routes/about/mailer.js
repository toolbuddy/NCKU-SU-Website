// Import send email object
const nodemailer = require('nodemailer');
const config = require('../../../model/config');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
})

module.exports = function(options) {
  transporter.sendMail( options , (error,info) => {
    if(error) console.log(error);
    else console.log('Sending email: ' + info.response);
  })
}