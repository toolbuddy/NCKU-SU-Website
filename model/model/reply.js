module.exports = function(sequelize, DataTypes) {
    var reply = sequelize.define('reply', {
        content: {
            type: DataTypes.TEXT
        }
    });

    return reply;
}
