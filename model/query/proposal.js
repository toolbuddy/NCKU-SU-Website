const db = require('../sqldb')
const target = db.models.proposal;
const Op = db.sequelize.Op;
const ID_FILTER = '%%%%%%%%%'

function add(data) {
  // Promise array
  const pa = new Array()
    
  pa.push(new Promise((resolve, reject) => {
    db.sequelize.transaction( t => {
      target.create({
        studentId: data.studentId,
        title: data.title,
        content: data.content,
        needVoter: data.needVoter,
        classId: data.classId
      })
      .then( res => {
        resolve(res.getDataValue('id'));
      })
      .catch( err => {
        reject(err);
      });
    });
  }));

  // push tag to promise array
  for (var i=0; i<data.tags.length; ++i) {
    pa.push(new Promise((resolve, reject) => {
      const tag = data.tags[i];
      db.sequelize.transaction( t => {
        db.models.tag.findOrCreate({
          where: { title: tag}
        })
        .then( res => {
          resolve(res[0].getDataValue('id'));
        })
        .catch( err => {
          reject(err);
        });
      });
    }));
  };

  // create proposalTag
  return Promise.all(pa)
  .then( res => {
    // res[0] -> article, res[1.....] -> tag
    for (var i=1; i<res.length; ++i) {
      db.models.proposalTag.create({
        tagId: res[i],
        proposalId: res[0]
      })
      .then( res => {
        return true;
      })
      .catch( err => {
        return false;
      });
    }
  }
}

function del(id) {
  db.sequelize.transaction( t => {
    target.findById(id)
    .then( rse => {
        res.destroy();
    });
  });
}

function getArticle(sum, offset, classId, id=ID_FILTER) {
  return new Promise( (resolve, reject) => {
    target.findAll({
      order: ['id'],
      offset: offset,
      sum: sum,
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
      resolve(res);
    });
  });
}

function getSum(id=ID_FILTER) {
  return target.count({where: {studentId: { [Op.like]: id }}});
}

module.exports = {
  add: add,
  del: del,
  getArticle: getArticle,
  getSum: getSum
}
