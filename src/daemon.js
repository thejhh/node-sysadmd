/* System Administration Daemon */
var mod = module.exports = {};

var foreach = require('snippets').foreach;

function do_getent(dbname, fn) {
	var spawn = require('child_process').spawn,
	    getent = spawn('getent', [dbname]),
	    full_data = '',
	    errors = '';
	
	getent.stdout.on('data', function (data) {
		full_data += data;
	});

	getent.stderr.on('data', function (data) {
		errors += data;
	});

	getent.on('exit', function (code) {
		var lines, records = [];
		if(code !== 0) {
			fn('Exit code was ' + code + ': ' + errors);
		} else {
			lines = full_data.split('\n');
			foreach(lines).each(function(line) {
				if(line.length === 0) return;
				records.push( line.split(':') );
			});
			fn(undefined, records);
		}
	});
}

function do_getent_group(fn) {
	do_getent("group", function(err, lines) {
		if(err) {
			return fn(err);
		}
		var records = [];
		foreach(lines).each(function(line) {
			records.push({
				name: line[0],
				passwd: line[1],
				gid: line[2],
				users: line[3].split(',')
			});
		});
		return fn(undefined, records);
	});
}

function do_getent_passwd(fn) {
	do_getent("passwd", function(err, passwd) {
		if(err) {
			return fn(err);
		}
		var records = [];
		foreach(passwd).each(function(line) {
			records.push({
				login: line[0],
				password: line[1],
				uid: line[2],
				gid: line[3],
				comment: line[4],
				home: line[5],
				shell: line[6] });
		});
		return fn(undefined, records);
	});
}

mod.createServer = function() {
	var remoted = require('remote-daemon');
	remoted.createServer({appname:'sysadmd'}, {
		users: function (cb) {
			do_getent_passwd(cb);
		},
		groups: function (cb) {
			do_getent_group(cb);
		}
	});
};

/* EOF */
