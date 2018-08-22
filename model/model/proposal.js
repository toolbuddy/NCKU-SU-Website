module.exports = function(sequelize, DataTypes){

  var proposal = sequelize.define('proposal', {
    title: {
        type: DataTypes.STRING(64)
    },
    content: {
        type: DataTypes.TEXT
    },
    threshold: {
        type: DataTypes.INTEGER
    },
    currentVoter: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    closeDiscuss: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  });

  return proposal;
  
}
