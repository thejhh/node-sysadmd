/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var mod = module.exports = {},
    qualify = require('qualify');

/** Find object for path
 * @param path Optional. Returns the index if undefined.
 * @param fn Callback function that will get the results in format function(errors, objects)
 */
mod.find = qualify.conform({
	type:'async',
	min:1,
	max:2,
	validate:[{type:'string'}]
}, function(path, fn) {
	fn("Not implemented"); // FIXME: Implement it!
});

/** Returns path as a ServicePath object
 * @param path Path as string
 */
mod.path = qualify.conform({type:'async',length:2,validate:[{type:'string',required:true}]}, function(path, fn) {
	fn("Not implemented"); // FIXME: Implement it!
});

/* EOF */
