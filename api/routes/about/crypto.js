const crypto = require('crypto');

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

module.exports = {
  encrypt,
  decrypt
}