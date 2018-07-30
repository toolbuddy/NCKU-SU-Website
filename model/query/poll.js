const db = require('../sqldb')
const poll = db.poll;
const Op = db.sequelize.Op

function vote(student, proposal, agree) {
    db.sequelize.transaction(t => {
        return poll.create({
          agree: agree,
          proposalId: proposal,
          StudentID: student
        })
        .then( res => {
            console.log(res);
        });
    });
}

function getVoteStat(proposal) {
    poll.count({
        where: {
            proposalID: {
                [Op.eq]: proposal
            }
        }
    })
    .then( res => {
        console.log(res);
    });
}

function getAccountVote(student) {
    poll.findAll({
        include: [db.proposal],
        where: {
            studentId: {
                [Op.eq]: student
            }
        },
        attributes: ['proposalId']
    })
    .then( res => {
        for (var i=0; i<res.length; ++i) {
            console.log(res[i].getDataValue('proposal').getDataValue('title'));
        }
    });
}

module.exports = {
    vote: vote,
    getVoteStat: getVoteStat,
    getAccountVote: getAccountVote
}
