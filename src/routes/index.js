var express = require('express');
var router = express.Router();

// const express = require('express')
// var authMiddleWare = require('../middleware/auth-middleware'); // auth checker
// var router = express.Router();
// router.use(authMiddleWare);
// router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.sendStatus(200)
})

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


module.exports = router;
