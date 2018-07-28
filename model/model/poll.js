module.exports = function(sequelize, DataTypes) {
    var poll = sequelize.define('poll', {
        agree: {
            type: DataTypes.BOOLEAN,
        },
    });

    return poll;
};
