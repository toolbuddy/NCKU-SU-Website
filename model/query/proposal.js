const db = require('../sqldb')
const target = db.models.proposal;
const sequelize = db.sequelize
const Op = sequelize.Op;
const ID_FILTER = '%%%%%%%%%'

function add(data) {
  // Promise array
  const pa = new Array()
    
  pa.push(new Promise((resolve, reject) => {
    sequelize.transaction( t => {
      target.create({
        studentId: data.studentId,
        title: data.title,
        content: data.content,
        threshold: data.threshold,
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
      sequelize.transaction( t => {
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
  });
}

function del(id) {
  sequelize.transaction( t => {
    target.findById(id)
    .then( rse => {
        res.destroy();
    });
  });
}

// return: article data array [Promise]
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

// return: currenVoter [Promise]
function vote(id) {
  return target.findById(id)
  .then( res => {
    return res.increment('currentVoter')
    .then( sum => {
      // can receive number after voted
      return sum.getDataValue('currentVoter');
    })
  });
}

// return: id array [Promise]
function exceed() {
  return target.findAll({
    where: sequelize.where(sequelize.col('currentVoter'), '>=',
                           sequelize.col('threshold'))
  })
  .then( res => {
    ids = [];
    res.forEach( ele => {
      ids.push(ele.getDataValue('id'))
    });
    return ids;
  });
}

module.exports = {
  add: add,
  del: del,
  getArticle: getArticle,
  getSum: getSum,
  vote: vote,
  exceed: exceed
}
