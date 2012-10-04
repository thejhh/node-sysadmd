/* */

var remoted = require('dnode-daemon'),
    foreach = require('snippets').foreach;

remoted.connect({'remote_cmd':'bin/sysadmd','remote_args':[]}, function (service, dnode) {
	//console.log("DEBUG: service = " + JSON.stringify(service) );
	service.list(["user", "group"], function (err, records) {
		if(err) {
			process.stderr.write('Error: ' + err + '\n');
			return;
		}
		//console.log("DEBUG: records = " + JSON.stringify(records) );
		foreach(records).each(function(record, id) {
			console.log(id + " => " + JSON.stringify(record));
		});
		dnode.end();
	});
});

/* EOF */
