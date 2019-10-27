var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Brugsanvisning til API'}); // [https://expressjs.com/en/api.html#res.render]
});

router.get('/om-os', function (req, res, next) {
    res.render('about', {title: 'Om os'});
});

module.exports = router;
