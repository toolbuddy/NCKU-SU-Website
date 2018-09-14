const db = require('../sqldb')
const crypto = require('crypto')
const base64url = require('base64url')
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
    return account.verifyPwd(passwd, res.hashed)
    .then( val => {
      if (val) {
        console.log("in /model/query/login.js: permission: " + res.perm);
        return res.perm;
      }
      else {
        return "-1"
      }
    })
  });
}

/*
 * set account status to verified email
 */
function verify(studentId) {
  db.sequelize.transaction( t=> {
    account.update(
      { verified: true },
      { where: {studentId: studentId} }
    )
    .then( () => {
        console.log("verified in model/query/account.js");
    });
  })
}

/*
 *  get the token for password reset
 */
function getToken(studentId) {
  return new Promise( (resolve, reject) => {
    account.findById(studentId)
    .then( res => {
      resolve(res.getDataValue('token'))
    })
    .catch( () => {
      reject("wrong studentId")
    })
  })
}

/*
 * check if token exists and should be primary key
 */
function checkToken(token) {

  return new Promise( (resolve, reject) => {
    account.findOne({where: {token: token}})
    .then( res => {
      if (!res) reject("cannot find")
      return res;
    })
    .catch( err => {
        reject("cannot find")
    })
    .then( res => {
      let newToken = base64url(crypto.randomBytes(30))
      //TODO: prevent duplicate token

      // update token column
      db.sequelize.transaction( t => {
        res.update({
          token: newToken
        })
        .then( res => {
          resolve(newToken)
        })
      })
    })
  })
}

/*
 * create a totally new account
 */
function createAccount(data) {
    console.log('hi')

  // Promise array
  let pa = [];
  pa.push(new Promise( (resolve, reject) => {
    account.hashFunc(data.password)
    .then( p => {
      resolve(p)
    });
  }));
  pa.push(new Promise( (resolve, reject) => {
    resolve(base64url(crypto.randomBytes(30)))
  }));

  Promise.all(pa).then( res => {
    console.log(res[0] + ' ' + res[1]);
    db.sequelize.transaction( t=> {
      console.log(data.username);
      account.create({
        studentId: data.username,
        email: data.email,
        password: res[0],
        name: data.name,
        token: res[1]
      })
    });
  });
}

/*
 * get email by studentId, used in "forgot password"
 */
function getEmail(id) {
  return new Promise( (resolve, reject) => {
    account.findById(id)
    .then( res => {
      resolve(res.getDataValue('email'));
    });
  });
}

/*
 * change password by studentId, used in "forgot password"
 */
function changepwd(id, newpwd) {

  let passwd = '';

  // get hashed value
  account.hashFunc(newpwd)
  .then( p => {
    passwd = p;
  })
  .then( () => {
    db.sequelize.transaction( t => {
      // update password
      account.update(
        { password: passwd },
        { where: {studentId: id} }
      )
      .then( res=> {
        console.log(res);
      })
      .catch( err=> {
        console.log(err);
      });
    });
  })
  .catch( err=> {
    console.log(err);
  });
  
}

module.exports = {
  /* account */
  login: login,
  create: createAccount,
  verify: verify,

  /* password */
  getEmail: getEmail,
  changepwd: changepwd,

  /* token */
  getToken: getToken,
  checkToken: checkToken
};
