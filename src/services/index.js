/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var mod = module.exports = {},
	services = {
		user: require('./services/user.js'),
		group: require('./services/group.js')
	};

/** List records
 * @param path
 * @param fn Callback function that will get the results in format function(errors, objects)
 */
mod.list = function(path, fn) {
	fn("Not implemented");
};

/** 
 */
mod.add = function(fn) {
	fn("Not implemented");
};

mod.del = function(fn) {
	fn("Not implemented");
};

mod.modify = function(fn) {
	fn("Not implemented");
};

/* EOF */
