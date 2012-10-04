var spawn = require('child_process').spawn;
var getent = spawn('getent', ['passwd']);

getent.stdout.on('data', function(data) {
	console.log('stdout: "' + data + '"');
});

getent.stderr.on('data', function(data) {
	console.log('stdout: "' + data + '"');
});

getent.on('exit', function (code) {
	console.log('exit with ' + code);
});
