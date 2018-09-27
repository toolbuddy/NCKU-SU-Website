const {Router} = require('express');
const router = Router();
const discussOp = require('../../model/query/discuss.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends:false});

router.post('/delReply',urlencodedParser,(req,res)=>{
  discussOp.del(req.body.id, 'reply');
  res.end();
})

module.exports = router;