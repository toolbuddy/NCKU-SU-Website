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
 */
function add(data, type) {

  const [tar, par] = getRef(type);
  const obj = {content: data.content, studentId: data.studentId}
  obj[par] = data.parentId;

  return db.sequelize.transaction( t => {
    return tar.create(obj)
    .then( res => {
        console.log(res);
    });
  });
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

function getSum(id, type) {

  const [tar, par] = getRef(type);
  const scope = {};
  scope[par] = id;

  return new Promise( (resolve, reject) => {
    tar.findAll({
      where: scope
    })
    .then( res => {
      resolve(res.length);
    });
  });
}

module.exports = {
  add: add,
  del: del,
  getContent: getContent,
  getSum: getSum,
}
