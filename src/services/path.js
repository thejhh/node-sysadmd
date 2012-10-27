/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var qualify = require('qualify');

/** Constructor function */
function ServicePath() {
}

module.exports = ServicePath;

/** Get parent path
 * @param fn Callback function that will get the results in format function(errors, objects)
 */
ServicePath.prototype.parent = qualify.conform({type:'async',length:1,validate:[{type:'function',required:true}]}, function(fn) {
	fn("Not implemented");
});

/* EOF */
