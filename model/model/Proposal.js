module.exports = function(sequelize, DataTypes){

  var Proposal = sequelize.define('Proposal', {
      content: {
          type: DataTypes.TEXT
      },
      title: {
          type: DataTypes.STRING(64)
      },
      deadline: {
          type: DataTypes.DATE
      },
      requireVoter: {
          type: DataTypes.INTEGER.UNSIGNED
      },
      deadlineA: {
          type: DataTypes.DATE
      },
      deadlineB: {
          type: DataTypes.DATE
      },
      deadlineC: {
          type: DataTypes.DATE
      },
      deadlineD: {
          type: DataTypes.DATE
      }
  });

  return Proposal;
  
}
