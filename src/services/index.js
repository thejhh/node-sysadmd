/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var mod = module.exports = {},
    fun = require('../fun.js');

/** Find object for path
 * @param path Optional. Returns the index if undefined.
 * @param fn Callback function that will get the results in format function(errors, objects)
 */
mod.find = fun.conform({min:1,max:2}, function(path, fn) {
	fn("Not implemented");
});

/** Returns path as a ServicePath object
 * @param path Path as string
 */
mod.path = fun.conform({min:2,max:2}, function(path, fn) {
	fn("Not implemented");
});

/* EOF */
