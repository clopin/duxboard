mongoose = require('mongoose');
var resourceSchema = mongoose.Schema({name: String, counter: Number});
var resourceModel = mongoose.model('resource', resourceSchema);

var getResourceList = function getResourceList(res) {
    resourceModel.find().lean().exec(function (err, resourcelist) {
        res.render('resources', {title: 'Resources', resources: JSON.parse(JSON.stringify(resourcelist))});
    });
};

var editResource = function editResource(input, res) {
    var resource = resourceModel.findOne(input).exec(function (err, resource) {
        res.render('editresource', {title: 'Edit Resource', resource: JSON.parse(JSON.stringify(resource))});
    });
};

var updateResource = function updateResource(condition, input, res, callback) {
    resourceModel.update(condition, input, function (err) {
        if (err) {
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
        }
        callback();
    });
};

var insertResource = function insertResource(input, res, callback) {
    var newresource = new resourceModel(input);
    newresource.save(function (err) {
        if (err) {
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
        };
        callback();
    });
};

var deleteResource = function deleteResource(input, res, callback) {
    resourceModel.remove({_id: input},function (err) {
        if (err) {
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
        }
        callback();
    });
};

module.exports.getResourceList = getResourceList;
module.exports.insertResource = insertResource;
module.exports.deleteResource = deleteResource;
module.exports.editResource = editResource;
module.exports.updateResource = updateResource;