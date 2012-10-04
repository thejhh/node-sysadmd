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
	
	/** List all services from the system
	 * @param types Array of types
	 * @param fn Callback function
	 */
	methods.list = function (path, fn) {
		//process.stderr.write("DEBUG: list method called\n");

		if(!( fn && (typeof fn === "function") )) {
			throw new Error("Error! daemon.list called with invalid callback function!\n");
			return;
		}

		/*
		if(!( types && (types instanceof Array) )) {
			return fn("Invalid first argument: types");
		}

		if(types.length === 0) {
			var objects = {};
			foreach(objects).each(function(obj, name) {
				objects[name] = services[type].getMetaData();
			});
			fn(undefined, objects);
			return;
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
				fn(errors.shift(), objects);
			} else if(errors.length !== 0) {
				fn("Several errors occured: \n - " + errors.join("\n - "), objects);
			} else {
				fn(undefined, objects);
			}
		}
		waiter();
	*/
	};

	/* Add new object to the system
	 * @param id Object identifier
	 * @param values Object values
	 * @param fn Callback function
	 */
	methods.add = function(id, values, fn) {
		fn("Not implemented");
	};

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
