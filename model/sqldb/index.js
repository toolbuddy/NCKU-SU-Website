Sequelize = require('sequelize');
var config = require('../config.js');

db = {
    sequelize: new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize)
};
db.account = db.sequelize.import('../model/account.js');
db.article = db.sequelize.import('../model/article.js');
db.proposal = db.sequelize.import('../model/proposal.js');
db.tag = db.sequelize.import('../model/tag.js');
db.poll = db.sequelize.import('../model/poll.js');
db.discuss = db.sequelize.import('../model/discuss.js');
db.proposalClass = db.sequelize.import('../model/proposalClass.js');
db.articleTag = db.sequelize.import('../model/articleTag.js');
db.collection = db.sequelize.import('../model/collection.js');
db.proposalAgree = db.sequelize.import('../model/proposalAgree.js');
db.proposalTag = db.sequelize.import('../model/proposalTag.js');
db.reply = db.sequelize.import('../model/reply.js');

// relations 
db.account.hasMany(db.article, {foreignKey: 'studentId'});

db.account.belongsToMany(db.article, {through: 'collection', foreignKey: 'studentId'});
db.article.belongsToMany(db.account, {through: 'collection', foreignKey: 'articleId'});

db.poll.belongsTo(db.article, {foreignKey: 'articleId'});
db.article.hasMany(db.poll, {foreignKey: 'articleId'});

db.poll.belongsTo(db.account, {foreignKey: 'studentId'});
db.account.hasMany(db.poll, {foreignKey: 'studentId'});

db.account.hasMany(db.proposal, {foreignKey: 'studentId'});
db.proposal.belongsTo(db.account, {foreignKey: 'studentId'});

db.proposal.belongsToMany(db.account, {through: 'proposalAgree', foreignKey: 'proposalId'});
db.account.belongsToMany(db.proposal, {through: 'proposalAgree', foreignKey: 'studentId'});

db.proposalClass.hasMany(db.proposal, {foreignKey: 'classId'});
db.proposal.belongsTo(db.proposalClass, {foreignKey: 'classId'});

db.article.belongsToMany(db.tag, {through: 'articleTag', foreignKey: 'articleId'});
db.tag.belongsToMany(db.article, {through: 'articleTag', foreignKey: 'tagId'});

db.proposal.belongsToMany(db.tag, {through: 'proposalTag', foreignKey: 'proposalId'});
db.tag.belongsToMany(db.proposal, {through: 'proposalTag', foreignKey: 'tagId'});

db.account.hasMany(db.discuss, {foreignKey: 'studentId'});
db.discuss.belongsTo(db.account, {foreignKey: 'studentId'});

db.article.hasMany(db.discuss, {foreignKey: 'articleId'});
db.discuss.belongsTo(db.article, {foreignKey: 'articleId'});

db.discuss.hasMany(db.reply, {foreignKey: 'discussId'});
db.reply.belongsTo(db.discuss, {foreignKey: 'discussId'});

db.account.hasMany(db.reply, {foreignKey: 'studentId'});
db.reply.belongsTo(db.account, {foreignKey: 'studentId'});

module.exports = db;

