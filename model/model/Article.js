module.exports = (sequelize, DataTypes) => {
    var Article = sequelize.define('Articles', {
        ArticleAttr: {
            type: DataTypes.BOOLEAN
        },
        ArticleTitle: {
            type: DataTypes.STRING(64)
        },
        ArticleContent: {
            type: DataTypes.TEXT
        },
        ArticlePic: {
            type: DataTypes.STRING(64)
        }
    });

    return Article;
}
