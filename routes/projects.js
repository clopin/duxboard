var express = require('express');
var router = express.Router();

var project = require('../project.js');


/* GET projects listing. */
router.get('/', function(req, res, next) {
    project.getProjectList(res)
});

router.get('/new', function(req, res, next) {
    res.render('newproject', {title: 'New Project'})
});

router.post('/', function(req,res){
    project.insertProject({ name: req.body.name, counter: req.body.counter }, function () {project.getProjectList(res)});
});

module.exports = router;
