module.exports = (sequelize, DataTypes) => {
  var topNews= sequelize.define('topNews', {
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    }
  });

  topNews.associate = function(models) {
    topNews.belongsToMany(models.tag, {through: models.articleTag, foreignKey: 'newsId'});
    topNews.belongsToMany(models.account, {through: models.collection, foreignKey: 'topNewsId'});
  }

  return topNews;
}
