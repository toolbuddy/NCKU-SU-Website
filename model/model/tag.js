module.exports = function(sequelize, DataTypes) {
  var tag = sequelize.define('tag', {
    title: {
      type: DataTypes.STRING(16)
    }
  }, {
    timestamps: false
  });
  tag.associate = function(models) {
    tag.belongsToMany(models.proposal, {through: models.proposalTag, foreignKey: 'tagId'});
    tag.belongsToMany(models.message, {through: models.articleTag, foreignKey: 'tagId'});
    tag.belongsToMany(models.topNews, {through: models.articleTag, foreignKey: 'tagId'});
  }
  return tag;
};
