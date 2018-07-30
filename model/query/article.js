const db = require('../sqldb')
const article = db.article;
const articleTag = db.articleTag;
const tag = db.tag;

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

function getArticle(id) {
  return new Promise( (resolve, reject) => {
    article.findById(id)
    .then( res => {
      resolve(res.dataValues);
    });
  });
}

function getAccountArticle(student) {
  return new Promise( (resolve, reject) => {
    article.findAll({
      where: {
        studentId: student
      }
    })
    .then( res => {
      resolve(/* TODO: dataValues in different elements*/);
    });
  });
}

function getAllArticle(studentId) {
}

module.exports = {
  add: addArticle
}
