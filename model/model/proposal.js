module.exports = function(sequelize, DataTypes){

  var proposal = sequelize.define('proposal', {
    title: {
        type: DataTypes.STRING(64)
    },
    content: {
        type: DataTypes.TEXT
    },
    threshold: {
        type: DataTypes.INTEGER,
        defaultValue: 9999999
    },
    currentVoter: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    closeDiscuss: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    browseStat: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  proposal.associate = function(models) {
    proposal.belongsTo(models.account, {foreignKey: 'studentId'});
    proposal.belongsToMany(models.account, {through: 'proposalAgree', foreignKey: 'proposalId'});
    proposal.belongsToMany(models.tag, {through: 'proposalTag', foreignKey: 'proposalId'});
    proposal.belongsTo(models.proposalClass, {foreignKey: 'classId'});
    proposal.hasMany(models.discuss, {foreignKey: 'proposalId'});
  };
  return proposal;
  
}
