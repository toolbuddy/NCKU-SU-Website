module.exports = function(sequelize, DataTypes) {
  var collection = sequelize.define('collection',{
  }, {
    scopes: {
      modify: function(student, article){
        return {
          where: {
            studentId: student,
            articleId: article
          }
        }
      }
    }
  });

  return collection;
}
