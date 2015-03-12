mongoose = require('mongoose');
var projectSchema = mongoose.Schema({name: String, counter: Number});
var projectModel = mongoose.model('project', projectSchema);

var getProjectList = function getProjectList(res) {
    projectModel.find().lean().exec(function (err, projectlist) {
        res.render('projects', {title: 'Projects', projects: JSON.parse(JSON.stringify(projectlist))});
    });
};

var editProject = function editProject(input, res) {
    var project = projectModel.findOne(input).exec(function (err, project) {
        res.render('editproject', {title: 'Edit Project', resource: JSON.parse(JSON.stringify(project))});
    });
};

var updateProject = function updateProject(condition, input, res, callback) {
    projectModel.update(condition, input, function (err) {
        if (err) {
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
        }
        callback();
    });
};

var insertProject = function insertProject(input, callback) {
    var newproject = new projectModel(input);
    newproject.save(function (err) {
        if (err) {
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
        };
        callback();
    });
};

var deleteProject = function deleteProject(input, callback) {
    projectModel.remove({_id: input},function (err) {
        if (err) {
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
        }
        callback();
    });
};

module.exports.getProjectList = getProjectList;
module.exports.insertProject = insertProject;
module.exports.deleteProject = deleteProject;
module.exports.editProject = editProject;
module.exports.updateProject = updateProject;