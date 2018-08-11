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
      type:DataTypes.INTEGER,
	    defaultValue: false
    },
    email: {
      type: DataTypes.STRING(30)
    },
    name: {
      type:DataTypes.STRING(16)
    },
    verified: {
  	  type:DataTypes.BOOLEAN,
	    defaultValue: false
    }
  });

    return account;
};

