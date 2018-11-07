const { Router } = require('express')
const router = Router()

// logout
router.get('/logout',(req,res) => {
  console.log('logout!!')
  // remove local cookie.
  res.clearCookie('connect.sid');
  // remove the server store cookie.
  req.session.destroy();
  return res.redirect('/');
})

module.exports = router;