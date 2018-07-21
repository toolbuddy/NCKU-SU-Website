Sequelize = require('sequelize');
var config = require('../config');

db = {
    sequelize: new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize)
};
db.AccountData = db.sequelize.import('../model/AccountData.js')
db.Article = db.sequelize.import('../model/Article.js')
db.Proposal = db.sequelize.import('../model/Proposal.js')
db.Tag = db.sequelize.import('../model/Tag.js')
db.Collection = db.sequelize.import('../model/Collection.js')

// relations 
db.AccountData.hasMany(db.Article, {foreignKey: 'StudentID'});
db.Article.belongsTo(db.AccountData,{ foreignKey: 'StudentID'});

db.Proposal.belongsTo(db.AccountData, {foreignKey: 'StudentID'});
db.AccountData.hasMany(db.Proposal, {foreignKey: 'StudentID'});

db.Tag.belongsTo(db.Article, {foreignKey: 'ArticleID'});
db.Article.hasMany(db.Tag, {foreignKey: 'ArticleID'});

db.Collection.belongsTo(db.Article, {foreignKey: 'ArticleID'});
db.Collection.belongsTo(db.AccountData, {foreignKey: 'StudentID'});
db.Article.hasMany(db.Tag, {foreignKey: 'ArticleID'});
db.AccountData.hasMany(db.Collection, {foreignKey: 'StudentID'});


module.exports = db;
