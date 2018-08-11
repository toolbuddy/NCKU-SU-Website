const db = require('../sqldb')
const account = db.models.account;

/*
 * login function
 * return value:(string)
 *  0  -> login success, without admin
 *  1  -> login success, with admin
 *  -1 -> login failed
 */
function login(username, passwd) {
    
  return account.findOne({
    where: {
        studentId: username
    },
    attributes: ['password', 'permission']
  })
  .then( res => {
    hashed = res.dataValues.password;
    return {
        perm: res.dataValues.permission,
        hashed: hashed
    };
  })
  .then( res => {
    return account.verify(passwd, res.hashed)
    .then( val => {
      if (val){
          console.log("in /model/query/login.js: permission: " + res.perm);
          return res.perm;
      }
      else{
          console.log("wrong username or password");
          return "-1";
      }
    });
  });
}

function verified(studentId) {
  db.sequelize.transaction( t=> {
    account.update({
      verified: true
    }, {
        where: {studentId: studentId}
    })
    .then( () => {
        console.log("verified in model/query/account.js");
    });
  })
}

function createAccount(data) {

  new Promise( (res, rej) => {
    account.hashFunc(data.password)
    .then( p => {
        res(p);
    });
  })
  .then( passwd => {
    db.sequelize.transaction( t=> {
      account.create({
        studentId: data.username,
        email: data.email,
        password: passwd,
        name: data.name,
        //college: data.college,
        //grade: data.grade
      })
      .then( res=> {
          console.log(res);
      });
    });
  });
}

module.exports = {
  login: login,
  verify: verified,
  create: createAccount
};
