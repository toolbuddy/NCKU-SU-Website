const db = require('../sqldb')
<<<<<<< HEAD
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
=======
const tag = db.models.tag;
const Op = db.sequelize.Op;
const ID_FILTER = '%%%%%%%%%'

/*
add(1, {
  studentId: 'F74056132',
  title: 'title',
  content: 'content',
  tags: ['tg1', 'tg2', 'tg3'],
  files: ['/path/to/files', '/abcabcabc/', 'this/is/file']
});
*/

function add(vital, data) {
  // Promise array
  const pa = new Array();
    
  const target = vital?db.models.topNews:db.models.message;
  const name = vital?'newsId':'messageId';
  // push article to promise array
  pa.push(new Promise((resolve, reject) => {
    db.sequelize.transaction( t => {
      target.create({
        studentId: data.studentId,
        title: data.title,
        content: data.content
      })
      .then( res => {
        // return the articleId
        resolve(res.getDataValue('id'));
      })
      .catch( err => {
        reject(err);
      });
    })
  }));

  // push tag to promise array
  for (var i=0; i<data.tags.length; ++i) {
    pa.push(new Promise((resolve, reject) => {
      const tag = data.tags[i];
      db.sequelize.transaction( t => {
        db.models.tag.findOrCreate({
          where: { title: tag }
        })
        .then (res => {
          resolve(res[0].getDataValue('id'));
        })
        .catch( err => {
          reject(err);
        });
      });
    }));
  };

  return Promise.all(pa)
  .then( res => {
    db.sequelize.transaction( t => {
      for (var i=1; i<res.length; ++i) {
        // create articleTag
        db.models.articleTag.create({
          tagId: res[i],
          newsId: res[0]
        })
        .then( res => {
            console.log(res);
        });
      };

      // insert file path
      for (var i=0; i<data.files.length; ++i) {
        const obj = {path: data.files[i]};
        obj[name] = res[0];
        db.models.file.create(obj);
      }
    });
  });
}

function del(id) {
>>>>>>> develop
  db.sequelize.transaction( t=> {
    article.findById(id)
    .then( res => {
      res.destroy();
    });
  });
}

<<<<<<< HEAD
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
=======
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
  add: add,
  del: del,
  getArticle: getArticle,
  getSum: getSum
>>>>>>> develop
}
