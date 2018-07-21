const { Router } = require('express')

const router = Router()
const loginOperation = require('../../model/query/login.js')
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

/* GET user listing. */
router.post('/user', urlencodedParser, (req, res) => {
    let username = req.body.username;
    let pwd = req.body.password;
    let status;
    let val;

    loginOperation.login(username, pwd)
    .then( val =>{
        console.log("val = " + val);
    });
    if (val == true) status = "1"

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
