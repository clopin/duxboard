var express = require('express');
var router = express.Router();

var resource = require('../resource.js');


/* GET resources listing. */
router.get('/', function(req, res, next) {
	resource.getResourceList(res)
});

router.get('/new', function(req, res, next) {
    res.render('newresource', {title: 'New Resource'})
}); 

router.post('/', function(req,res){
    resource.insertResource({ name: req.body.name, counter: req.body.counter }, function () {resource.getResourceList(res)});
});

router.post('/delete', function(req, res) {
    resource.deleteResource(req.body.resourceid, function () {
        res.redirect('/resources')
    });
});

module.exports = router;
