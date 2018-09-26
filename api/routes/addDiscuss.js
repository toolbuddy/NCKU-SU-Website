const {Router} = require('express');
const router = Router();
const discussOp = require('../../model/query/discuss.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends:false});

router.post('/addDiscuss',urlencodedParser,(req,res)=>{
  discussOp.add(req.body, 'discuss')
  .then( id => {
    console.log('discuss added, id = ' + id);
  })
  res.end();
})

module.exports = router;