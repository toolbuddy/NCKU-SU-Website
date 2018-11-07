module.exports = function(sequelize, DataTypes) {
  var discuss = sequelize.define('discuss', {
    content: {
      type: DataTypes.TEXT
    }
  });
  discuss.associate = function(models) {
    discuss.belongsTo(models.account, {foreignKey: 'studentId'});
    discuss.hasMany(models.reply, {foreignKey: 'discussId'});
    discuss.belongsTo(models.proposal, {foreignKey: 'proposalId'});
  }
  return discuss;
}
