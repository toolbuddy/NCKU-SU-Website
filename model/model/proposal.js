module.exports = function(sequelize, DataTypes){

  var proposal = sequelize.define('proposal', {
    title: {
        type: DataTypes.STRING(64)
    },
    content: {
        type: DataTypes.TEXT
    },
    needVoter: {
        type: DataTypes.INTEGER
    },
    currentVoter: {
        type: DataTypes.INTEGER
    },
    closeDiscuss: {
        type: DataTypes.BOOLEAN
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
