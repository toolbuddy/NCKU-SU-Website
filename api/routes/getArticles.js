const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends : false});
const ArticleOp = require('../../model/query/article.js');


router.post('/getArticle_topnews',urlencodedParser,(req , res) => {
    let number = 1;
    let offset = req.body.number - 1;
    ArticleOp.getArticle(1,number,offset)
    .then((val) => {
        res.json(val);
    }).catch((err) => {
        console.log(err);
    })
})

router.post('/getArticle_message',urlencodedParser,(req,res) => {
    let number = 1;
    let offset = req.body.number - 1;
    ArticleOp.getArticle(0,number,offset)
    .then((val) => {
        res.json(val);
    }).catch((err) => {
        console.log(err);
    })
})