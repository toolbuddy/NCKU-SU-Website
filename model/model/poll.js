module.exports = function(sequelize, DataTypes) {
  var poll = sequelize.define('poll', {
    agree: {
        type: DataTypes.BOOLEAN,
    },
  });

 	poll.associate = function(models) {
 		poll.belongsTo(models.pollArticle, {foreignKey: 'articleId'});
 		poll.belongsTo(models.account, {foreignKey: 'studentId'});
 	}

   return poll;
};
