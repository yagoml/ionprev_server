var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.json({ text: 'sucess!' })
});

module.exports = router
