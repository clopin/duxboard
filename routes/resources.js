// Variables
var express = require('express');
var router = express.Router();
var resource = require('../resource.js');

// Render listing
router.get('/', function(req, res) {
	resource.getResourceList(res)
});

// Render form for new entry
router.get('/new', function(req, res) {
    res.render('newresource', {title: 'New Resource'})
});

// Process new entry
router.post('/', function(req,res){
    resource.insertResource({ name: req.body.name, counter: req.body.counter }, res, function () {resource.getResourceList(res)});
});

// Delete entry
router.post('/delete', function(req, res) {
    resource.deleteResource(req.body.resourceid, res, function () {
        res.redirect('/resources')
    });
});

// Render edit form
router.get('/edit', function(req, res) {
    resource.editResource(req.query.resourceid, res);
});

// Process edit form
router.post('/edit', function(req,res){
    resource.updateResource({ _id: req.body.resourceid}, {name: req.body.name, counter: req.body.counter }, res, function () {res.redirect('/resources')});
});

// Export router
module.exports = router;
