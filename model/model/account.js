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

  account.associate = function(models) {
	account.hasMany(models.topNews, {foreignKey: 'studentId'});
	account.hasMany(models.message, {foreignKey: 'studentId'});
	account.belongsToMany(models.topNews, {through: models.collection, foreignKey: 'studentId'});
	account.belongsToMany(models.message, {through: models.collection, foreignKey: 'studentId'});
	account.hasMany(models.poll, {foreignKey: 'studentId'});
	account.hasMany(models.proposal, {foreignKey: 'studentId'});
	account.belongsToMany(models.proposal, {through: models.proposalAgree, foreignKey: 'studentId'});
	account.hasMany(models.discuss, {foreignKey: 'studentId'});
	account.hasMany(models.reply, {foreignKey: 'studentId'});
  }
  
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

