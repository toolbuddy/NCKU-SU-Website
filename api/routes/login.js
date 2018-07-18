const { Router } = require('express')

const router = Router()

/* GET developer listing. */
router.get('/user', (req, res) => {
    console.log("test");
});

/* GET developer by ID. */
router.get('/developers/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < data.length) {
    res.json(data[id])
  } else {
    res.sendStatus(kk)
  }
})


module.exports = router;
