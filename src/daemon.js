/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var mod = module.exports = {},
    os = require('os'),
    qualify = require('qualify'),
    getent = require('./getent.js'),
    foreach = require('snippets').foreach,
    services = require('./services/index.js');

/* Create dnode server */
mod.createServer = qualify.conform({length:0}, function() {
	var remoted = require('dnode-daemon'),
	    methods = {};
	
	/** Get data from specified path
	 * @param path Optional. Returns the index if undefined.
	 * @param fn Callback function in format function(err, data)
	 */
	methods.get = qualify.conform({type:'async',defaults:'right',min:1,max:2, validate:[{type:'string', "required":true}]}, function (path, fn) {
		var s = services.find(path);
		if(!s) {
			fn("Could not find path " + path);
			return;
		}
		fn(undefined, s);
	});

	/* Add new object to the system
	 * @param path Object identifier
	 * @param values Object values
	 * @param fn Callback function
	 */
	methods.create = qualify.conform({type:'async',length:3, validate:[{type:'string', "required":true}, {type:'object', "required":true}]}, function(path, data, fn) {
		var s = services.find(services.path(path).parent());
		if(!s) {
			fn("Could not find parent for path " + path);
			return;
		}
		s.create(data, fn);
	});

	/* Update an object in the system
	 * @param path Resource path
	 * @param changes New values for object
	 * @param fn Callback in format function(err)
	 */
	methods.modify = qualify.conform({type:'async',length:3, validate:[{type:'string', "required":true}, {type:'object', "required":true}] }, function(path, changes, fn) {
		var s = services.find(path);
		if(!s) {
			fn("Could not find path " + path);
			return;
		}
		s.modify(changes, fn);
	});

	/* Remove an object from the system
	 * @param path Path to object
	 * @param fn Callback function
	 */
	methods.del = qualify.conform({type:'async',length:2, validate:[{type:'string', "required":true}]}, function(path, fn) {
		var s = services.find(path);
		if(!s) {
			fn("Could not find path " + path);
			return;
		}
		s.del(fn);
	});
	
	//process.stderr.write("methods = " + JSON.stringify(methods) + "\n");
	remoted.createServer({appname:'sysadmd'}, methods);

});

/* EOF */
