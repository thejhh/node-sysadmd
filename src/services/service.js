/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var qualify = require('qualify');

/** Constructor function */
function Service() {
}

module.exports = Service;

/** Create new child object
 * @param fn Callback function that will send the results in format function(errors, objects)
 */
Service.prototype.create = qualify.conform({
	type:'async',
	min:1,
	max:2,
	validate:[
		{type:'object'},
		{type:'function',required:true}
	]
}, function(data, fn) {
	data = data || {};
	fn("Not implemented"); // FIXME: Implement it!
});

/** Modify object
 * @param fn Callback function that will send the results in format function(errors, objects)
 */
Service.prototype.modify = qualify.conform({type:'async',length:2,validate:[{type:'object'},{type:'function',required:true}]}, function(data, fn) {
	fn("Not implemented"); // FIXME: Implement it!
});

/** Delete current object
 * @param fn Callback function that will send the results in format function(errors, objects)
 */
Service.prototype.del = qualify.conform({type:'async',length:1,validate:[{type:'function',required:true}]}, function(fn) {
	fn("Not implemented"); // FIXME: Implement it!
});

/* EOF */
