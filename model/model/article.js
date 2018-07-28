module.exports = (sequelize, DataTypes) => {
    var article = sequelize.define('article', {
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT
        },
        vital: {
            type: DataTypes.BOOLEAN
        }
    });

    return article;
}
