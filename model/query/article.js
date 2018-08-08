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

function getArticle(type, sum, offset) {
  return new Promise( (resolve, reject) => {
  	article.findAll({
	  where: {
	  	vital: type
	  },
	  order: ['id'],
	  offset: start,
	  limit: sum
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

/* TODO: not this version! */
function getSum(type) {
  return new Promise( (resolve, reject) => {
  	article.count( {
  		where: {
  			vital: type
  		}
  	})
  	.then( sum => {
  		resolve(sum);
  	});
  });
}
getSum(0).then(res=>{console.log(res)});
getSum(1).then(res=>{console.log(res)});

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


module.exports = {
  add: addArticle,
  getArticle: getArticle
}
