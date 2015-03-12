var express = require('express');
var router = express.Router();

// Set the globals that are required
mongoose  = require('mongoose');
var projectSchema = mongoose.Schema({name: String, counter: Number});
var projectModel = mongoose.model('project', projectSchema);

// Connect Mongoose to the db already
// mongoose.connect(process.env.MONGOLAB_URI);

function getProjectList(req, res) {
	projectModel.find().lean().exec(function (err, projectlist) {
		res.render('projects', {title: 'Projects', projects: JSON.parse(JSON.stringify(projectlist))});
	});
}

/* GET project listing. */
router.get('/', function(req, res, next) {
	getProjectList(req, res)
});

router.get('/new', function(req, res, next) {
  res.render('newproject', {title: 'New Project'})
}); 

router.post('/', function(req,res){
	var newproject = new projectModel({ name: req.body.name, counter: req.body.counter });
	newproject.save(function (err) {
		if (err) {
	  		res.writeHead(500, {'content-type': 'text/plain'});
	    	res.end('An error occurred');
		};
		getProjectList(req, res)
	});
});

module.exports = router;
