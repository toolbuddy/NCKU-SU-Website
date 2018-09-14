const {Router} = require('express');
const router = Router();
const proposalOp = require('../../model/query/proposal.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends:false});

router.post('/ProposalSum',urlencodedParser,(req,res)=>{
    proposalOp.getSum()
    .then((sum) => {
        res.send(sum);
    })
    .catch((err) => {
        console.log(err);
    })
})

module.exports = router;