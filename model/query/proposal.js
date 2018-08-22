const db = require('../sqldb')
const target = db.models.proposal;
const Op = db.sequelize.Op;
const ID_FILTER = '%%%%%%%%%'

function add(data) {
  db.sequelize.transaction( t => {
    target.create({
      studentId: data.studentId,
      title: data.title,
      content: data.content,
      needVoter: data.needVoter,
    });
  });
  // TODO: class? tag?
}

function del(id) {
  db.sequelize.transaction( t => {
    target.findById(id)
    .then( rse => {
        res.destroy();
    });
  });
}

function getArticle(sum, offset, id=ID_FILTER) {
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
