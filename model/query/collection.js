const db = require('../sqldb');
const collection = db.collection;
const Op = db.sequelize.Op;

function getCollection(student) {

    collection.findAll({
        where: {
            studentId: student
        }
    })
    .then( res => {
        res.forEach( ele => {
            console.log(ele.getDataValue('articleId'));
        });
    });
}

function addCollection(student, article) {

    db.sequelize.transaction( t => {
        return collection.create({
            studentId: student,
            articleId: article
        })
        .then ( res => {
            console.log(res);
        });
    });
}

function delCollection(student, article) {
    
    collection.findAll({
        where: {
            studentId: student,
            articleId: article
        }
    })
    .then( res => {
        if (res.length == 0) {
            console.log("cannot find collection");
            return ;
        }
        else {
            db.sequelize.transaction( t => {
                collection.scope({method: ['modify', student, article]}).destroy();
            });
        }
    });
}

module.exports = {
    get: getCollection,
    add: addCollection,
    del: delCollection
}
