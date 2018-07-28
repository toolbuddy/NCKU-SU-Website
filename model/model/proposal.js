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

  return proposal;
  
}
