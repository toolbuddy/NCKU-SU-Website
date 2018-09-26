const {Router} = require('express');
const router = Router();
const discussOp = require('../../model/query/discuss.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends:false});

router.post('/ReplyContent',urlencodedParser,(req,res)=>{
  discussOp.getContent(req.body.discuss_id, 'reply')
  .then(con => {
    console.log(con)
    res.send(con)
  });
  res.end()
})

module.exports = router;