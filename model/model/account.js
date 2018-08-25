var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    var account = sequelize.define('account', {
      studentId: {
        type:DataTypes.STRING(9),
        primaryKey: true
      },
      password: {
        type:DataTypes.STRING(60)
      },
      permission: {
        type:DataTypes.INTEGER
      },
      name: {
        type:DataTypes.STRING(16)
      }
    });

    account.hashFunc = async function(passwd) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(passwd, 10)
            .then(hash => {
                resolve(hash);
            })
        });
    };

    account.verify = async function(input, hashed) {
        return bcrypt.compare(input, hashed);
    }

    return account;
};

