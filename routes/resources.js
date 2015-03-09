var express = require('express');
var router = express.Router();

var pg = require('pg');
var conString = "postgres://kevin:@localhost/kevin";

var resourceList = [];

/* GET resources listing. */
router.get('/', function(req, res, next) {

	pg.connect(conString, function(err, client, done) {

	    var handleError = function(err) {
	      // no error occurred, continue with the request
	      if(!err) return false;

	      // An error occurred, remove the client from the connection pool.
	      // A truthy value passed to done will remove the connection from the pool
	      // instead of simply returning it to be reused.
	      // In this case, if we have successfully received a client (truthy)
	      // then it will be removed from the pool.
	      done(client);
	      res.writeHead(500, {'content-type': 'text/plain'});
	      res.end('An error occurred');
	      return true;
	    };

	    client.query('SELECT name FROM dux_resources', function(err, result) {

        	// handle an error from the query
	        if(handleError(err)) return;
	        resourceList = result.rows;
	        
	         for (var i = 0; i < result.rows.length; i++) {
	         	resourceList[i] = result.rows[i].name
			 }

		    // return the client to the connection pool for other requests to reuse
		    done();
		});
    });
	res.render('resources', {title: 'Resources', resources: resourceList})
});

router.get('/new', function(req, res, next) {
  res.render('newresource')
}); 

router.post('/', function(req,res){
    pg.connect(conString, function(err, client, done) {

	    var handleError = function(err) {
	      // no error occurred, continue with the request
	      if(!err) return false;

	      // An error occurred, remove the client from the connection pool.
	      // A truthy value passed to done will remove the connection from the pool
	      // instead of simply returning it to be reused.
	      // In this case, if we have successfully received a client (truthy)
	      // then it will be removed from the pool.
	      done(client);
	      res.writeHead(500, {'content-type': 'text/plain'});
	      res.end('An error occurred');
	      return true;
	    };

	    client.query('INSERT INTO dux_resources(name, counter)VALUES ($1, $2);'
	    	,[req.body.name, req.body.counter]
	    	, function(err, result) {

        	// handle an error from the query
	        if(handleError(err)) return;

			// return the client to the connection pool for other requests to reuse
			done();
		});
    });
	res.render('resources', {title: 'Resources', resources: resourceList})
});

module.exports = router;
