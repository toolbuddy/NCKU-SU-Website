const db = require('../sqldb');
const discuss = db.discuss;
const Op = db.sequelize.Op;

function getDiscuss(articleId) {
    discuss.findAll({
        where: {
            articleId: articleId,
        },
        order: ['id', ['repliable', 'DESC']],
        attributes: ['id', 'repliable']
    })
    .then( res => {
        res.forEach( ele => {
            console.log(ele.dataValues);
        });
    });
}

function addDiscuss(studentId, articleId, content, replyId=null) {
    db.sequelize.transaction( t=> {
        return discuss.create({
            studentId: studentId,
            articleId: articleId,
            replyId: replyId,
            content: content,
            repliable: (isReply==null)
        })
        .then( res => {
            console.log(res);
            console.log("create successfully");
        });
    });
}

function delDiscuss(studentId, articleId, replyId) {

    checkPermission(replyId, studentId, articleId)
    .then( res => {
        console.log("delete success in model/query/discuss.js");
        db.sequelize.transaction( t=> {
            return discuss.findOne({
                where:{
                    id: replyId
                }
            })
            .then( res => {
                res.destroy();
            });
        });
    })
    .catch( err => {
        console.log("cannot delete data in model/query/discuss.js");
    });
}

function checkPermission(id, student, article) {

    // check if is comment owner
    var p1 = discuss.findById(id);

    // check if is article owner
    var p2 = discuss.findAll({
        include: [{
            model: db.article,
            where: { studentId: student , id: article}
        }]
    });

    return new Promise( (resolve, reject) => {
        Promise.all([p1, p2]).then( res => {
          if (res[0].getDataValue('studentId') == student) resolve();
          else if (res[1].length != 0) resolve();
          else reject();
        });
    });
}

module.exports = {
  add: addDiscuss,
  get: getDiscuss,
  del: delDiscuss
};
