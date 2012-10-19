/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var fun = require('../fun.js');

/** Constructor function */
function ServicePath() {
}

module.exports = ServicePath;

/** Get parent path
 * @param fn Callback function that will get the results in format function(errors, objects)
 */
ServicePath.prototype.parent = fun.conform({min:1,max:1}, function(fn) {
	fn("Not implemented");
});

/* EOF */
