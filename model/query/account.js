const db = require('../sqldb')
const account = db.account;

/*
 * login function
 * return value:(string)
 *  0 -> login success
 *  1 -> password incorrect
 *  2 -> username not exist
 */
function login(username, passwd) {
    
  return account.findOne({
      where: {
          studentId: username
      },
      attributes: ['password']
  })
  .then( res => {
      hashed = res.dataValues.password;
      return account.verify(passwd, hashed)
      .then( val => {
          console.log("in /model/query/login.js: " + val);
          if (val) return "0";
          else return "1";
      });
  })
  .catch( err => {
      // username not exist
      return "2"
  });
}

module.exports = {
    login: login
};
