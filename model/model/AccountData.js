var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    var AccountData = sequelize.define('AccountData', {
      StudentID: {
        type:DataTypes.STRING(9),
        primaryKey: true
      },
      password: {
        type:DataTypes.STRING(60)
      },
      Permission: {
        type:DataTypes.BOOLEAN
      },
      UserName: {
        type:DataTypes.STRING(16)
      }
    });

    AccountData.hashFunc = async function(passwd) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(passwd, 10)
            .then(hash => {
                resolve(hash);
            })
        });
    };

    AccountData.verify = async function(input, hashed) {
        return bcrypt.compare(input, hashed);
    }

    return AccountData;
};

