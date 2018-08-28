module.exports = function(sequelize, DataTypes) {
  var reply = sequelize.define('reply', {
    content: {
      type: DataTypes.TEXT
    }
  });

  reply.associate = function(models) {
    reply.belongsTo(models.discuss, {foreignKey: 'discussId'});
    reply.belongsTo(models.account, {foreignKey: 'studentId'});
  }

  return reply;
}
