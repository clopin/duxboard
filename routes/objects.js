// Variables
var express = require('express');
var router = express.Router();
var project = require('../project.js');
var resource = require('../resource.js');

// Render listing
router.get('/*', function(req, res, next) {
    if (req.path == '/projects') {
        project.getProjectList(res)
    } else if (req.path == '/resources') {
        resource.getResourceList(res)
    } else {
        console.log(req.path)
    }
});

// Render form for new entry
router.get('/new', function(req, res, next) {
    if (req.path == '/projects/new') {
        res.render('newproject', {title: 'New Project'})
    } else if (req.path == '/resources/new') {
        res.render('newresource', {title: 'New Resource'})
    } else {
        console.log(req.path)
    }

});

// Process new entry
router.post('/', function(req,res){
    project.insertProject({ name: req.body.name, counter: req.body.counter }, function () {project.getProjectList(res)});
});

// Export router
module.exports = router;