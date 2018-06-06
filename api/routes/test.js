const { Router } = require('express')

const router = Router()

// Fake data test
const data = [
  { name: '109/資訊 黃俊豪' },
  { name: '109/資訊 林志嘉' },
  { name: '109/資訊 歐子玉' },
  { name: '109/資訊 洪培軒'}
]

/* GET developer listing. */
router.get('/developers', (req, res) => {
    res.json(data);
});

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
