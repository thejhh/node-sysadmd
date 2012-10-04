/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var mod = module.exports = {},
    foreach = require('snippets').foreach,
    spawn = require('child_process').spawn,
    request_counter = 0;

/* Generic getent */
mod.generic = function(dbname, fn) {
	var getent,
	    full_data = '',
	    errors = '',
		data_event_seen = false,
	    loop_counter = 0,
	    current_count = request_counter;
	request_counter += 1;

	getent = spawn('getent', [dbname]);

	getent.stdout.on('data', function(data) {
		//process.stderr.write("DEBUG: #" + current_count +" stdout data event: '" + data + "'\n");
        full_data += data;
		data_event_seen = true;
    });
	
	getent.stderr.on('data', function (data) {
		//process.stderr.write("DEBUG: #" + current_count +" stderr data event: '" + data + "'\n");
		errors += data;
	});
	
	getent.on('exit', function process_end(code) {
		
		// If there is no data yet we will try again later. There seems to be possible bug in Node since data event is emitted some times after the exit event.
		if(!data_event_seen) {
			setTimeout(function() {
				loop_counter += 1;
				if(loop_counter < 6) {
					process_end(code);
				}
			}, 100);
			return;
		}
		
		//process.stderr.write("DEBUG: #" + current_count +" getent exit event with code " + code + "\n");
		var lines, records = [];
		//process.stderr.write("DEBUG: code = " + code + ", full_data='" + full_data + "', errors='"+errors+"'\n");
		if(code !== 0) {
			fn('Exit code was ' + code + ': ' + errors);
		} else {
			lines = full_data.split('\n');
			foreach(lines).each(function(line) {
				if(line.length === 0) {
					return;
				}
				records.push( line.split(':') );
			});
			fn(undefined, records);
		}
	});
};

/* Getent for group databasse */
mod.group = function(fn) {
	mod.generic("group", function(err, lines) {
		if(err) {
			return fn(err);
		}
		var records = [];
		foreach(lines).each(function(line) {
			records.push({
				_label: line[0],
				name: line[0],
				passwd: line[1],
				gid: line[2],
				users: line[3].split(',')
			});
		});
		fn(undefined, records);
	});
};

/* Getent for passwd database */
mod.passwd = function(fn) {
	mod.generic("passwd", function(err, passwd) {
		//process.stderr.write("mod.generic() returned err = " + err + " and passwd = " + JSON.stringify(passwd) + "\n");
		if(err) {
			return fn(err);
		}
		var records = [];
		foreach(passwd).each(function(line) {
			records.push({
				_label: line[0],
				login: line[0],
				password: line[1],
				uid: line[2],
				gid: line[3],
				comment: line[4],
				home: line[5],
				shell: line[6] });
		});
		fn(undefined, records);
	});
};

/* EOF */
