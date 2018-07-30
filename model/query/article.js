const db = require('../sqldb')
const article = db.article;

function addArticle(student, title, content, vital, tags) {
  db.sequelize.transaction( t=> {
    article.create({
      studentId: student,
      content: content,
      vital: vital
    });
  });

  // TODO: add tags
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
