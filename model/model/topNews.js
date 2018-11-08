module.exports = (sequelize, DataTypes) => {
  var topNews= sequelize.define('topNews', {
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    },
    browseStat: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  topNews.associate = function(models) {
    topNews.belongsToMany(models.tag, {through: models.articleTag, foreignKey: 'newsId'});
    topNews.belongsToMany(models.account, {through: models.collection, foreignKey: 'newsId'});
    topNews.hasMany(models.file, {foreignKey: 'newsId'});
  }

  return topNews;
}
