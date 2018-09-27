const {Router} = require('express');
const router = Router();
const discussOp = require('../../model/query/discuss.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends:false});

router.post('/addReply',urlencodedParser,(req,res)=>{
  discussOp.add(req.body, 'reply')
  .then (id => {
    console.log('reply added to discuss , id = ',id);
  })
  res.end();
})

module.exports = router;