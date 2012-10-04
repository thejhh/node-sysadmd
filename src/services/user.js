/* User accounts module */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var os = require('os');
var foreach = require('snippets').foreach;
var getent = require('../getent.js');
var mod = module.exports = {};

/** Get metadata for this service */
mod.getMetaData = function() {
	return {'description':'System user accounts'};
};

/** List records
 * @param objects Submits new objects into this object as properties.
 * @param fn Callback function that will get the results in format function(errors, objects)
 */
mod.list = function(objects, fn) {
	if(!( fn && (typeof fn === "function") )) {
		process.stderr.write("Error! user.list@daemon.js called with invalid callback function!\n");
		return;
	}
	if(!( objects && (typeof objects === "object") )) {
		return fn("Invalid type for first argument for user.list");
	}
	getent.passwd(function(err, records) {
		//process.stderr.write("getent.passwd() returned err = " + err + " and records = " + JSON.stringify(records) + "\n");
		if(err) {
			return fn(err);
		}
		// FIXME: Check records type
		foreach(records).each(function(record) {
			//process.stderr.write( "DEBUG: foreach each at user.list: " + JSON.stringify(record) + "\n");
			var id = "/user/" + record._label;
			if(objects[id]) {
				// FIXME: Do not ignore duplicates, generate different ID?
				process.stderr.write("Warning! id as " + id + " exists already! Ignoring second record...\n");
				return;
			}
			record._host = os.hostname();
			record._type = "user";
			objects[id] = record;
		});
		fn(undefined, objects);
	});
};

/** 
 */
mod.add = function(fn) {
	fn("Not implemented");
			// [:groupadd if no group]
			// useradd -g GROUP -s /bin/bash -d HOME -m -p CRYPTED_PASSWORD USERNAME
			// adduser USERNAME users
			// mkdir -p HOME
			// chmod HOME_PERMS HOME
			// chown USERNAME:GROUP HOME
};

mod.del = function(fn) {
	fn("Not implemented");
};

mod.modify = function(fn) {
	fn("Not implemented");
};

/*
function mailbox_add(cb) {
			// [:groupadd if no group]
			// useradd -g GROUP -k /etc/skel.mailbox -s /usr/local/bin/mailbox-shell.sh -d HOME -m -p CRYPTED_PASSWORD USERNAME
			// adduser USERNAME mailbox
			// mkdir -p HOME
			// chmod HOME_PERMS HOME
			// chown USERNAME:GROUP HOME
}
*/

/* EOF */
