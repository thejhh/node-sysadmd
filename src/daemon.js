/* System Administration Daemon */
var mod = module.exports = {};
var os = require('os');
var getent = require('./getent.js');
var foreach = require('snippets').foreach;

/* */
function list_users(objects, fn) {
	if(!( fn && (typeof fn === "function") )) {
		process.stderr.write("Error! list_users@daemon.js called with invalid callback function!\n");
		return;
	}
	if(!( objects && (typeof objects === "object") )) return fn("Invalid type for first argument for list_users");
	getent.passwd(function(err, records) {
		if(err) return fn(err);
		// FIXME: Check records type
		foreach(records).each(function(record) {
			//process.stderr.write( "DEBUG: foreach each at list_users: " + JSON.stringify(record) + "\n");
			var id = "host:" + os.hostname() + "/group.gid:" + record["gid"] + "/" + record["_label"];
			if(objects[id]) {
				// FIXME: Do not ignore duplicates, generate different ID?
				process.stderr.write("Warning! id as " + id + " exists already! Ignoring second record...\n");
				return;
			}
			record["_type"] = "user";
			objects[id] = record;
		});
		fn(undefined, objects);
	});
}

/* */
function list_groups(objects, fn) {
	if(!( fn && (typeof fn === "function") )) {
		process.stderr.write("Error! list_users@daemon.js called with invalid callback function!\n");
		return;
	}
	if(!( objects && (typeof objects === "object") )) return fn("Invalid type for first argument for list_users");
	getent.group(function(err, records) {
		if(err) return fn(err);
		// FIXME: Check records type
		foreach(records).each(function(record) {
			var id = "host:" + os.hostname() + "/" + record["_label"];
			if(objects[id]) {
				// FIXME: Do not ignore duplicates, generate different ID?
				process.stderr.write("Warning! id as " + id + " exists already! Ignoring second record...\n");
				return;
			}
			record["_type"] = "group";
			objects[id] = record;
		});
		fn(undefined, objects);
	});
}

function add_group() {
	// groupadd GROUP
	// mkdir -p /home/GROUP
	// chmod GROUP_PERMS /home/GROUP
	// chown root:GROUP /home/GROUP
	// [quotatool -g GROUP -bq SOFTQUOTA -l HARDQUOTA QUOTAMOUNTPATH]
}

function add_user() {
			// [:groupadd if no group]
			// useradd -g GROUP -s /bin/bash -d HOME -m -p CRYPTED_PASSWORD USERNAME
			// adduser USERNAME users
			// mkdir -p HOME
			// chmod HOME_PERMS HOME
			// chown USERNAME:GROUP HOME
}

function mailbox_add(cb) {
			// [:groupadd if no group]
			// useradd -g GROUP -k /etc/skel.mailbox -s /usr/local/bin/mailbox-shell.sh -d HOME -m -p CRYPTED_PASSWORD USERNAME
			// adduser USERNAME mailbox
			// mkdir -p HOME
			// chmod HOME_PERMS HOME
			// chown USERNAME:GROUP HOME
}

function site_add(cb) {

			//: sendanor-administration.sh
			// mkdir -p SITES_DIR
			// chown USERNAME:GROUP SITES_DIR
			// chmod SITES_DIR_PERMS SITES_DIR
			// mkdir -p SITE_DIR
			// chown USERNAME:GROUP SITE_DIR
			// chmod SITE_DIR_PERMS SITE_DIR
			// mkdir -p DOCROOT
			// chown USERNAME:GROUP DOCROOT
			// chmod DOCROOT_PERMS DOCROOT
			// mkdir -p WEBLOGDIR
			// chown root:adm WEBLOGDIR
			// chmod WEBLOGDIR_PERMS WEBLOGDIR
			// mkdir -p SITEWEBLOGDIR
			// chown root:adm SITEWEBLOGDIR
			// chmod SITEWEBLOGDIR_PERMS SITEWEBLOGDIR

			//: a2-enable-fcgid
			// if test ! -e "$vhostdir"/.config; then
			//         mkdir "$vhostdir"/.config
			// fi
			// chown "$username:$group" "$vhostdir"/.config
			// chmod 755 "$vhostdir"/.config
			// 
			// if test ! -f "$vhostdir"/.config/"$site"-php.fcgi; then
			//         cp /usr/local/bin/php-wrapper "$vhostdir"/.config/"$site"-php.fcgi
			// fi
			// chown "$username:$group" "$vhostdir"/.config/"$site"-php.fcgi
			// chmod 700 "$vhostdir"/.config/"$site"-php.fcgi
}

function mysql_list(cb) {
}

function mysql_add(cb) {
			// sql: CREATE DATABASE `(DATABASE)`
			// sql: GRANT ALL PRIVILEGES ON `(DATABASE)`.* TO '(USERNAME)'@'localhost' IDENTIFIED BY '(PASSWORD)'
			// sql: FLUSH PRIVILEGES
			
			// :Backup?
			// mkdir -p /etc/backup.nightly
			// num="`ls /etc/backup.nightly/|grep '^[0-9]'|sort -n|tail -n 1|sed 's/[^0-9].\+$/+1/'|calc -p`"
			// file="/etc/backup.nightly/$num-mysql-database-$database"
			// cat > "$file" << "EOF"
			// #!/bin/sh
			// name="`basename $0|sed -e 's/^[0-9]\+\-mysql\-database\-//'`"
			// /usr/sbin/backup-database.sh \
			//         --fileformat='%Y%m%d-%H%M%S-atlas-mysql-database-'"$name" \
			//         --backup-database="$name" || exit 1
			// exit 0
			// EOF
			// chmod 700 "$file"
}

function psql_list(cb) {
}

function psql_add(cb) {

			/*
			    # Perform actions
			    if su -l postgres -c "createuser -DRS '$username'" &&
			       su -l postgres -c "createdb -O '$username' '$database'"; then
			        :
			    else
			        echo 'Failed.'
			        exit 1
			    fi
			*/
}

function smtp_auth_list(cb) {
}

function smtp_auth_add(cb) {
	// htpasswd -b /etc/private/exim4/passwd "$username" "$password"
}

/* Create dnode server */
mod.createServer = function() {
	var remoted = require('dnode-daemon');
	var methods = {};
	
	/** List all objects of specific type(s) from the system
	 * @param types Array of types
	 * @param cb Callback function
	 */
	methods.list = function (types, cb) {
		//process.stderr.write("DEBUG: list method called\n");
		if(!( cb && (typeof cb === "function") )) {
			process.stderr.write("Error! daemon.list called with invalid callback function!\n");
			return;
		}
		if(!( types && (types instanceof Array) )) return cb("Invalid first argument: types");
		var objects = {};
		var errors = [];
		var counter = types.length;
		//process.stderr.write("DEBUG: types = " + JSON.stringify(types) +"\n");
		foreach(types).each(function(type) {
			//process.stderr.write("DEBUG: type = " +type +"\n");
			if(type === "user") {
				list_users(objects, function(err) {
					if(err) { errors.push(err); }
					counter--;
				});
			} else if(type === "group") {
				list_groups(objects, function(err) {
					if(err) { errors.push(err); }
					counter--;
				});
			} else {
				errors.push("Unknown object type: " + type);
				counter--;
			}
		});
		
		function waiter() {
			if(counter >= 1) {
				setTimeout(waiter, 100);
				return;
			}
			
			//process.stderr.write("DEBUG: objects = " + JSON.stringify(objects) +"\n");
			
			if(errors.length === 1) {
				cb(errors.shift(), objects);
			} else if(errors.length !== 0) {
				cb("Several errors occured: \n - " + errors.join("\n - "), objects);
			} else {
				cb(undefined, objects);
			}
		}
		waiter();
	};

	/* Add new object to the system
	 * @param id Object identifier
	 * @param values Object values
	 * @param cb Callback function
	 */
	methods.add = function(id, values, cb) {
		cb("Not implemented");
	};

	/* Update an object in the system
	 * @param id Object identifier
	 * @param values New values for the object
	 * @param cb Callback function
	 */
	methods.modify = function(id, values, cb) {
		cb("Not implemented");
	};

	/* Remove an object from the system
	 * @param id Object identifier
	 * @param cb Callback function
	 */
	methods.del = function(id, cb) {
		cb("Not implemented");
	};
	
	//process.stderr.write("methods = " + JSON.stringify(methods) + "\n");
	remoted.createServer({appname:'sysadmd'}, methods);
};

/* EOF */
