module.exports = function(sequelize, DataTypes){
  var file = sequelize.define('file', {
    path: {
      type: DataTypes.STRING
    }
  });

  file.association = function(models) {
    file.belongsTo(models.messages, {foreignKey:'messageId'});
    file.belongsTo(models.topNews, {foreignKey:'newsId'});
  }

  return file;
}
