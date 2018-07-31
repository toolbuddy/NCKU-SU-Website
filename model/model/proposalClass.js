module.exports = function(sequelize, DataTypes) {
    var proposalClass = sequelize.define('proposalClass', {
      title: {
          type: DataTypes.STRING(16)
      }
    }, {
        timestamps: false
    });

    return proposalClass;
};
