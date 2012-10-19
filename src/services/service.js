/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var fun = require('../fun.js');

/** Constructor function */
function Service() {
}

module.exports = Service;

/** Create new child object
 * @param fn Callback function that will send the results in format function(errors, objects)
 */
Service.prototype.create = fun.conform({min:1,max:2}, function(data, fn) {
	data = data || {};
	fn("Not implemented");
});

/** Modify object
 * @param fn Callback function that will send the results in format function(errors, objects)
 */
Service.prototype.modify = fun.conform({min:2,max:2}, function(data, fn) {
	fn("Not implemented");
});

/** Delete current object
 * @param fn Callback function that will send the results in format function(errors, objects)
 */
Service.prototype.del = fun.conform({min:1,max:1}, function(fn) {
	fn("Not implemented");
});

/* EOF */
