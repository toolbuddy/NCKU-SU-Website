const { Router } = require('express')

const router = Router()
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

/* GET user listing. */
router.post('/user', urlencodedParser, (req, res) => {
    let username = req.body.username;
    let pwd = req.body.password;
    let status;
    if( username == "F74052154" && pwd == "123456"){
      status = "0"; //CORRECT
    }
    else if(username == "F74052154" && pwd != "123456"){
      status = "1"; //PASSWORD ERROR
    }else{
      status = "2"; //has no username
    }
    res.send(status);
})

/* GET developer by ID. */
router.get('/developers/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < data.length) {
    res.json(data[id])
  } else {
    res.sendStatus(404)
  }
})

module.exports = router;
