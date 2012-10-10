/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var mod = module.exports = {},
    os = require('os'),
    fun = require('./fun.js'),
    getent = require('./getent.js'),
    foreach = require('snippets').foreach,
    services = require('./services/index.js');

/* Create dnode server */
mod.createServer = function() {
	var remoted = require('dnode-daemon'),
	    methods = {};
	
	/** Get data from specified path
	 * @param path Optional. Returns the index if undefined.
	 * @param fn Callback function in format function(err, data)
	 */
	methods.get = fun.conform({min:1,max:2}, function (path, fn) {
		var s = services.find(path);
		fn(undefined, s);
	});

	/* Add new object to the system
	 * @param path Object identifier
	 * @param values Object values
	 * @param fn Callback function
	 */
	methods.add = fun.conform({min:3,max:3}, function(path, obj, fn) {
		fn("Not implemented");
	});

	/* Update an object in the system
	 * @param id Object identifier
	 * @param values New values for the object
	 * @param fn Callback function
	 */
	methods.modify = function(id, values, fn) {
		fn("Not implemented");
	};

	/* Remove an object from the system
	 * @param id Object identifier
	 * @param fn Callback function
	 */
	methods.del = function(id, fn) {
		fn("Not implemented");
	};
	
	//process.stderr.write("methods = " + JSON.stringify(methods) + "\n");
	remoted.createServer({appname:'sysadmd'}, methods);
};

/* EOF */
