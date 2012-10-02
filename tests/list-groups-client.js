/* */

var remoted = require('remote-daemon'),
    foreach = require('snippets').foreach;

remoted.connect({'remote_cmd':'bin/sysadmd','remote_args':[]}, function (service, dnode) {
	service.groups(function (err, groups) {
		if(err) {
			process.stderr.write('Error: ' + err + '\n');
			return;
		}
		foreach(groups).each(function(group) {
			console.log(JSON.stringify(group));
		});
		dnode.end();
	});
});

/* EOF */
