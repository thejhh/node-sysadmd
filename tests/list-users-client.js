/* */

var remoted = require('dnode-daemon'),
    foreach = require('snippets').foreach;

remoted.connect({'remote_cmd':'bin/sysadmd','remote_args':[]}, function (service, dnode) {
	service.users(function (err, users) {
		if(err) {
			process.stderr.write('Error: ' + err + '\n');
			return;
		}
		foreach(users).each(function(user) {
			console.log(JSON.stringify(user));
		});
		dnode.end();
	});
});

/* EOF */
