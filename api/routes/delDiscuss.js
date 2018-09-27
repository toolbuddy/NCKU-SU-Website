const {Router} = require('express');
const router = Router();
const discussOp = require('../../model/query/discuss.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends:false});

router.post('/delDiscuss',urlencodedParser,(req,res)=>{
  discussOp.del(req.body.id, 'discuss');
  res.end();
})

module.exports = router;