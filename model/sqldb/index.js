Sequelize = require('sequelize');
var config = require('../config/index.js');

db = {
    sequelize: new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize),
	models: {}
};

new Promise((resolve, reject) => {
	db.models.account		= db.sequelize.import('../model/account.js');
	db.models.topNews 	= db.sequelize.import('../model/topNews.js');
	db.models.message		= db.sequelize.import('../model/message.js');
	db.models.proposal	= db.sequelize.import('../model/proposal.js');
	db.models.tag				= db.sequelize.import('../model/tag.js');
	db.models.poll 			= db.sequelize.import('../model/poll.js');
	db.models.discuss 	= db.sequelize.import('../model/discuss.js');
	db.models.reply 		= db.sequelize.import('../model/reply.js');
	db.models.pollArticle 	= db.sequelize.import('../model/pollArticle.js');
	db.models.proposalClass = db.sequelize.import('../model/proposalClass.js');
	db.models.articleTag		= db.sequelize.import('../model/articleTag.js');
	db.models.collection		= db.sequelize.import('../model/collection.js');
	db.models.proposalAgree = db.sequelize.import('../model/proposalAgree.js');
	db.models.proposalTag 	= db.sequelize.import('../model/proposalTag.js');
	resolve();
})
.then( () => {
	// bind relations
	for (var x in db.models) {
    if (db.models[x].hasOwnProperty('associate'))
		  db.models[x].associate(db.models);
	}
});

module.exports = db;

