const db = require('../sqldb')

/*
 * "data" in json format,
 * need content, studentId, parentId
 *
 * parameter "type" means to choose 'discuss' or 'reply'
 */
function add(data, type) {
  const target = (type==='discuss')?db.models.discuss:db.models.reply;
  const parentId = (type==='discuss')?'proposalId':'discussId';

  db.sequelize.transaction( t => {
    target.create({
      content: data.content,
      studentId: data.studentId,
      parentId: data.parentId
    });
  });
}

/*
 * parameter "type" means to choose 'discuss' or 'reply'
 */
function del(id, type) {
  const target = (type==='discuss')?db.models.discuss:db.models.reply;

  db.sequelize.transaction( t => {
    target.findById(id)
    .then( res => {
      res.destroy();
    });
  });
}

function get(id, type) {
  const target = (type==='discuss')?db.models.discuss:db.models.reply;
  const parentId = (type==='discuss')?'proposalId':'discussId';

  return new Promise( (resolve, reject) => {
    var ret = [];

    target.findAll({
      where: {
        parentId: id
      },
      order: ['id']
      // TODO: add limit or offset?
    })
    .then( res => {
      res.forEach( ele => {
        ret.append(ele.dataValues);
      });
    });
  });
}

module.exports = {
  add: add,
  del: del,
  get: get
}
