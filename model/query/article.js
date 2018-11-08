const db = require('../sqldb')
const article = db.models.article;
const articleTag = db.models.articleTag;
const tag = db.models.tag;

function addArticle(student, title, content, vital, tags) {

  new Promise( (resolve, reject) => {
    // add articles
    db.sequelize.transaction( t => {
      article.create({
        studentId: student,
        title: title,
        content: content,
        vital: vital
      })
      .then( res => {
          resolve(res.getDataValue('id'));
        });
      });
    }).then( articleId => {
  
    // add tags
      var cnt = 1;
      tags.forEach( ele => {
        tag.findOrCreate({
          where: {
            title: ele
          }
        })
        .then( res => {
          ;
          db.sequelize.transaction( t => {
            articleTag.create({
              articleId: articleId,
              tagId: res[0].getDataValue('id')
            })
            .catch( err => {
              console.log(err);
            });
          })
        })
      });
    });
  console.log(tags);
}

function delArticle(id) {
  db.sequelize.transaction( t=> {
    article.findById(id)
    .then( res => {
      res.destroy();
    });
  });
}

function getArticle(type, sum, offset, id=ID_FILTER) {
  const target = type?db.models.topNews:db.models.message;
  return new Promise( (resolve, reject) => {
    target.findAll({
        order: ['id'],
        offset: offset,
        limit: sum,
        where: {
          studentId: {
            [Op.like]: id
          }
        }
      })
      .then( res => {
        var tmp = [];
        res.forEach( ele => {
          tmp.push(ele.dataValues);
        });
        resolve(tmp);
      });
    });
  }

function getSum(type, id=ID_FILTER) {
  const target = type?db.models.topNews:db.models.message;
  return target.count({where: { studentId: { [Op.like]: id }}});
}

module.exports = {
  addArticle: addArticle,
  delArticle: delArticle,
  getArticle: getArticle,
  getSum: getSum
}
