const db = require('../sqldb')
const account = db.AccountData;

function login(username, passwd) {
    
  return account.findOne({
      where: {
          StudentID: username
      },
      attributes: ['password']
  })
  .then( res => {
      hashed = res.dataValues.password;
      return account.verify(passwd, hashed)
      .then( val => {
          console.log("in /model/query/login.js: " + val);
          return val;
      });
  })
  .catch( err => {
      return false;
  });
}

module.exports = {
    login
};
