/* System group module */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var os = require('os'),
    foreach = require('snippets').foreach,
    getent = require('../getent.js'),
    mod = module.exports = {};

/* */
mod.list = function(objects, fn) {
	if(!( fn && (typeof fn === "function") )) {
		process.stderr.write("Error! user.list@daemon.js called with invalid callback function!\n");
		return;
	}
	if(!( objects && (typeof objects === "object") )) {
		return fn("Invalid type for first argument for user.list");
	}
	getent.group(function(err, records) {
		if(err) { return fn(err); }
		// FIXME: Check records type
		foreach(records).each(function(record) {
			var id = "/group/" + record._label;
			if(objects[id]) {
				// FIXME: Do not ignore duplicates, generate different ID?
				process.stderr.write("Warning! id as " + id + " exists already! Ignoring second record...\n");
				return;
			}
			record._host = os.hostname();
			record._type = "group";
			objects[id] = record;
		});
		fn(undefined, objects);
	});
};

mod.add = function(fn) {
	fn("Not implemented");
	// groupadd GROUP
	// mkdir -p /home/GROUP
	// chmod GROUP_PERMS /home/GROUP
	// chown root:GROUP /home/GROUP
	// [quotatool -g GROUP -bq SOFTQUOTA -l HARDQUOTA QUOTAMOUNTPATH]
};

mod.del = function(fn) {
	fn("Not implemented");
};

mod.modify = function(fn) {
	fn("Not implemented");
};

/* EOF */
