// Variables
var express = require('express');
var router = express.Router();
var project = require('../project.js');

// Render listing
router.get('/', function(req, res, next) {
    project.getProjectList(res)
});

// Render form for new entry
router.get('/new', function(req, res, next) {
    res.render('newproject', {title: 'New Project'})
});

// Process new entry
router.post('/', function(req,res){
    project.insertProject({ name: req.body.name, counter: req.body.counter }, function () {project.getProjectList(res)});
});

// Delete entry
router.post('/delete', function(req, res) {
    project.deleteProject(req.body.projectid, function () {
        res.redirect('/projects')
    });
});

// Render edit form
router.get('/edit', function(req, res) {
    project.editProject(req.query.projectid, res);
});

// Process edit form
router.post('/edit', function(req,res){
    project.updateProject({ _id: req.body.projectid}, {name: req.body.name, counter: req.body.counter }, res, function () {res.redirect('/projects')});
});

// Export router
module.exports = router;
