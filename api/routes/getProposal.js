const {Router} = require('express');
const router = Router();
const proposalOp = require('../../model/query/proposal.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends:false});

router.post('/getProposal',urlencodedParser,(req,res)=>{
    let number = parseInt(req.body.number);
    let offset = parseInt(req.body.offset);
    proposalOp.getArticle(number,offset,"classId")
    .then((val) => {
        res.json(val);
    }).catch((err) => {
        console.log(err);
    })

})

module.exports = router;