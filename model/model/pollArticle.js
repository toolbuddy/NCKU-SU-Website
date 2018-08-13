module.exports = (sequelize, DataTypes) => {
    var pollArticle= sequelize.define('pollArticle', {
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT
        }
    });

	pollArticle.associate = function(models) {
		pollArticle.belongsToMany(models.tag, {through: models.articleTag, foreignKey: 'pollArticleId'});
		pollArticle.belongsToMany(models.account, {through: models.collection, foreignKey: 'pollArticleId'});
	}

    return pollArticle;
}
