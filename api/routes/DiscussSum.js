const {Router} = require('express');
const router = Router();
const discussOp = require('../../model/query/discuss.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends:false});

router.post('/DiscussSum',urlencodedParser,(req,res)=>{
  discussOp.getSum(req.body.id, 'discuss')
  .then( num => {
    console.log('number of discusses: ', num)
    res.send(num)
  });
  res.end()
})

module.exports = router;