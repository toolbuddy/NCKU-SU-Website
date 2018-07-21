module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define('Tag', {
      title: {
          type: DataTypes.STRING(16)
      }
    }, {
        timestamps: false
    });

    return Tag;
};
