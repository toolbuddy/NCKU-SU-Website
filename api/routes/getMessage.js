const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends : false});
const ArticleOp = require('../../model/query/article.js');

router.post('/getMessage',urlencodedParser,(req,res) => {
    let number = 10;
    let offset = parseInt(req.body.offset);
    ArticleOp.getArticle(0,number,offset)
    .then((val) => {
        res.json(val);
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router ;