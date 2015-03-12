var express = require('express');
var router = express.Router();

// Set the globals that are required
mongoose= require('mongoose');
var planningSchema = mongoose.Schema({date: Date, resource_ID: mongoose.Schema.Types.ObjectId, project_id: mongoose.Schema.Types.ObjectId});
var planningModel = mongoose.model('planning', planningSchema);

function getPlanning(req, res) {

	db.planningModel.find().lean().exec(function (err, planninglist) {
		// res.render('planning', {title: 'Planning', planning: JSON.parse(JSON.stringify(planninglist))});
	});
}

/* GET project listing. */
router.get('/', function(req, res, next) {
	getPlanning(req, res)
});

module.exports = router;
