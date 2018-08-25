module.exports = function(sequelize, DataTypes) {
    var tag = sequelize.define('tag', {
      title: {
          type: DataTypes.STRING(16)
      }
    }, {
        timestamps: false
    });

    return tag;
};
