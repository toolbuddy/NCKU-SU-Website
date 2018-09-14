const {Router} = require('express');
const router = Router();
const proposalOp = require('../../model/query/proposal.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends:false});

router.post('/deleteProposal',urlencodedParser,(req,res)=>{
    proposalOp.del("req.body.id")
    .then((val) => {
        console.log("proposal has been deleted");
    }).catch((err) => {
        console.log(err);
    })
    res.end();
})

module.exports = router;