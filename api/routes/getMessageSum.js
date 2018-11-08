const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends : false});
const ArticleOp = require('../../model/query/article.js');

router.post('/getMessageSum',urlencodedParser,(req,res) => {
    ArticleOp.getSum(0)
    .then((val) => {
        res.json(val);
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;