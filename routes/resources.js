var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var resourceSchema = mongoose.Schema({name: String, counter: Number});
var resourceModel = mongoose.model('resource', resourceSchema);
mongoose.connect('mongodb://localhost/duxboard');
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));

/* GET resources listing. */
router.get('/', function(req, res, next) {
	//db.once('open', function (callback) {
		resourceModel.find().lean().exec(function (err, resourcelist) {
			//console.log(JSON.stringify(resourcelist));
			res.render('resources', {title: 'Resources', resources: JSON.stringify(resourcelist)});
		});
	//});
});

router.get('/new', function(req, res, next) {
  res.render('newresource', {title: 'New Resource'})
}); 

router.post('/new', function(req,res){
	//db.once('open', function (callback) {
		var newresource = new resourceModel({ name: req.body.name, counter: req.body.counter });
		newresource.save(function (err) {
			if (err) {
		  		res.writeHead(500, {'content-type': 'text/plain'});
		    	res.end('An error occurred');
			};
		});
		res.render('newresource', {title: 'New Resource', message: 'Succes!'})
	//});
});

module.exports = router;
