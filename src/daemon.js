/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var mod = module.exports = {},
    os = require('os'),
    getent = require('./getent.js'),
    foreach = require('snippets').foreach,
    services = {
		user: require('./services/user.js'),
		group: require('./services/group.js')
	};

/* Create dnode server */
mod.createServer = function() {
	var remoted = require('dnode-daemon'),
	    methods = {};
	
	/** List all objects of specific type(s) from the system
	 * @param types Array of types
	 * @param cb Callback function
	 */
	methods.list = function (types, cb) {
		//process.stderr.write("DEBUG: list method called\n");
		if(!( cb && (typeof cb === "function") )) {
			process.stderr.write("Error! daemon.list called with invalid callback function!\n");
			return;
		}
		if(!( types && (types instanceof Array) )) {
			return cb("Invalid first argument: types");
		}
		var objects = {},
		    errors = [],
		    counter = types.length;
		//process.stderr.write("(initial) counter === " + counter + "\n");
		//process.stderr.write("DEBUG: types = " + JSON.stringify(types) +"\n");
		foreach(types).each(function(type) {
			//process.stderr.write("DEBUG: type = " +type +"\n");
			if(services[type] && (typeof services[type] === 'object')) {
				services[type].list(objects, function(err) {
					if(err) { errors.push(err); }
					counter -= 1;
				});
			} else {
				errors.push("Unknown object type: " + type);
				counter -= 1;
				//process.stderr.write("(unknown object) counter === " + counter + "\n");
			}
		});
		
		function waiter() {
			//process.stderr.write("waiter(): counter === " + counter + "\n");
			if(counter >= 1) {
				setTimeout(waiter, 100);
				return;
			}
			
			//process.stderr.write("DEBUG: objects = " + JSON.stringify(objects) +"\n");
			
			if(errors.length === 1) {
				cb(errors.shift(), objects);
			} else if(errors.length !== 0) {
				cb("Several errors occured: \n - " + errors.join("\n - "), objects);
			} else {
				cb(undefined, objects);
			}
		}
		waiter();
	};

	/* Add new object to the system
	 * @param id Object identifier
	 * @param values Object values
	 * @param cb Callback function
	 */
	methods.add = function(id, values, cb) {
		cb("Not implemented");
	};

	/* Update an object in the system
	 * @param id Object identifier
	 * @param values New values for the object
	 * @param cb Callback function
	 */
	methods.modify = function(id, values, cb) {
		cb("Not implemented");
	};

	/* Remove an object from the system
	 * @param id Object identifier
	 * @param cb Callback function
	 */
	methods.del = function(id, cb) {
		cb("Not implemented");
	};
	
	//process.stderr.write("methods = " + JSON.stringify(methods) + "\n");
	remoted.createServer({appname:'sysadmd'}, methods);
};

/* EOF */
