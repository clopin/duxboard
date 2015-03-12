var express = require('express');
var router = express.Router();

// Set the globals that are required
mongoose = require('../db.js');
var resourceSchema = mongoose.Schema({name: String, counter: Number});
var resourceModel = mongoose.model('resource', resourceSchema);

// Connect Mongoose to the db already
// mongoose.connect(process.env.MONGOLAB_URI);

function getResourceList(req, res) {
	resourceModel.find().lean().exec(function (err, resourcelist) {
		res.render('resources', {title: 'Resources', resources: JSON.parse(JSON.stringify(resourcelist))});
	});
}

/* GET resources listing. */
router.get('/', function(req, res, next) {
	getResourceList(req, res)
});

router.get('/new', function(req, res, next) {
  res.render('newresource', {title: 'New Resource'})
}); 

router.post('/', function(req,res){
	var newresource = new resourceModel({ name: req.body.name, counter: req.body.counter });
	newresource.save(function (err) {
		if (err) {
	  		res.writeHead(500, {'content-type': 'text/plain'});
	    	res.end('An error occurred');
		};
		getResourceList(req, res)
	});
});

module.exports = router;
