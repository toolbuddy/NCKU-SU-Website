const db = require('../sqldb')
const tag = db.models.tag;
const Op = db.sequelize.Op;
const ID_FILTER = '%%%%%%%%%'

function add(vital, data) {
  // Promise array
  const pa = new Array();
    
  const target = vital?db.models.topNews:db.models.message;
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

  // create articleTag
  return Promise.all(pa)
  .then( res => {
    for (var i=1; i<res.length; ++i) {
      db.models.articleTag.create({
        tagId: res[i],
        newsId: res[0]
      })
      .then( res => {
        return true;
      })
      .catch( err => {
        return false;
      });
    }
  });
}

function del(id) {
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
  add: add,
  del: del,
  getArticle: getArticle,
  getSum: getSum
}
