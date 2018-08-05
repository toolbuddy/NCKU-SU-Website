const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extends : false});
const ArticleOp = require('../../model/query/article.js');


router.post('/getArticle_topnews',urlencodedParser,(req , res) => {
    
})

router.post('/getArticle_message',urlencodedParser,(req,res) => {

})