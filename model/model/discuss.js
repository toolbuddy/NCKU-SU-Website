module.exports = function(sequelize, DataTypes) {
    var discuss = sequelize.define('discuss', {
        content: {
            type: DataTypes.TEXT
        }
    });

    return discuss;
}
