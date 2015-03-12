// Set the globals that are required
//var resource = this;
mongoose = require('mongoose');
var resourceSchema = mongoose.Schema({name: String, counter: Number});
var resourceModel = mongoose.model('resource', resourceSchema);

var getResourceList = function getResourceList(res) {
    resourceModel.find().lean().exec(function (err, resourcelist) {
        res.render('resources', {title: 'Resources', resources: JSON.parse(JSON.stringify(resourcelist))});
    });
};

var insertResource = function insertResource(input, callback) {
    var newresource = new resourceModel(input);
    newresource.save(function (err) {
        if (err) {
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
        };
        callback();
    });
};

module.exports.getResourceList = getResourceList;
module.exports.insertResource = insertResource;