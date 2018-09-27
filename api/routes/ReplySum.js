const {Router} = require('express');
const router = Router();
const discussOp = require('../../model/query/discuss.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends:false});

router.post('/ReplySum',urlencodedParser,(req,res)=>{
  discussOp.getSum(req.body.id, 'reply')
  .then( num => {
    console.log('number of discusses: ', num)
    res.send(num)
  });
  res.end()
})

module.exports = router;