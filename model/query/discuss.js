const db = require('../sqldb')

/*
 * helper functions
 */
function getRef(type) {
  const target = (type==='discuss')?db.models.discuss:db.models.reply;
  const parentName = (type==='discuss')?'proposalId':'discussId';
  return [target, parentName];
}

/*
 * "data" in json format,
 * need content, studentId, parentId
 *
 * parameter "type" means to choose 'discuss' or 'reply'
 * return id
 */
function add(data, type) {

  const [tar, par] = getRef(type);
  const obj = {content: data.content, studentId: data.studentId}
  obj[par] = data.parentId;

  return new Promise( (resolve, reject) => {
    db.sequelize.transaction( t => {
      tar.create(obj)
      .then( res => {
        resolve(res.getDataValue('id')
      })
    });
  })
}

/*
 * parameter "type" means to choose 'discuss' or 'reply'
 */
function del(id, type) {
  const [tar, par] = getRef(type);

  db.sequelize.transaction( t => {
    tar.findById(id)
    .then( res => {
      res.destroy();
    });
  });
}

/*
 * get discuss/reply content
 *
 * id: parentId
 * type: discuss or reply
 */
function getContent(id, type) {

  const [tar, par] = getRef(type);
  const scope = {};
  scope[par] = id;

  return new Promise( (resolve, reject) => {
    tar.findAll({
      where: scope,
      order: ['id']
    })
    .then( res => {
      var ret = [];
      res.forEach( ele => {
        ret.append(ele.dataValues);
      });
      resolve(ret);
    });
  });
}

/*
 * get the numbers of discuss/reply
 * id: parentId
 * type: discuss or reply
 */
function getSum(id, type) {

  const [tar, par] = getRef(type);
  const scope = {};
  scope[par] = id;

  return new Promise( (resolve, reject) => {
    tar.count({where: scope})
    .then( num => {
      resolve(num)
    })
  });
}

module.exports = {
  add: add,
  del: del,
  get: getContent,
  getSum: getSum,
}
