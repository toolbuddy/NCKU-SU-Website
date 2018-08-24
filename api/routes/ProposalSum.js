const {Router} = require('express');
const router = Router();
const proposalOp = require('../../model/query');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends:false});

router.post('/ProposalSum',urlencodedParser,(req,res)=>{
    
})

module.exports = router;