/* Tests for callback utilities */


/*
 * s == string
 * n == number
 * a == array
 * o == object
 * u == undefined
 * b == boolean
 * f == function
 * ? == optional
 */

/*
function foo(path, fn) {
	var args = conform([path, fn], ["s?", "f"]);
}
*/

/* Conforms argument list in reverse order and verifies that first (which was original last defined argument) is an function.
 * @param args Argument list as array.
 * @returns Returns argument list in reverse order. First element is the callback function.
 */
function revfun_conform(args, opts) {
	var arg, fn;
	try {
		opts = opts || {};
		args = Array.prototype.slice.call(args);
		
		// First priority to search for callback function
		args = args.reverse();
		while(args.length !== 0) {
			arg = args.shift();
			if(arg === undefined) {
				continue;
			}
			if(!( arg && (typeof arg === "function") )) {
				throw new TypeError("Last argument is not valid function!");
			}
			fn = arg;
			args.unshift(arg);
			break;
		}
		
		if(args.length === 0) {
			throw new TypeError("No callback function found!");
		}
		
		// Check limits
		if(opts.min && (args.length < opts.min) ) {
			throw new TypeError("Not enough arguments!");
		}
		
		if(opts.max && (args.length > opts.max) ) {
			throw new TypeError("Too many arguments!");
		}
		
		return args;
	} catch(e) {
		function prettify(e) {
			var msg = ""+e;
			if(e.fileName) {
				msg += " [" + e.fileName;
				if(e.lineNumber) {
					msg += ":" + e.lineNumber;
				}
				msg += "]";
			}
			if (e.stack) {
				msg += '\n====== stack ======\n';
				msg += e.stack + "\n";
			}
			return msg;
		}
		if(fn) {
			fn(prettify(e));
		} else {
			throw e;
		}
	}
}

/* Test function */
function foo(path, fn) {
	var args = revfun_conform(arguments, {max:2});
	if(!args) return;
	fn = args.shift();
	path = args.shift();
	fn("Path was " + path);
}

/* Test function */
function bar(path, fn) {
	var args = revfun_conform(arguments, {min:2, max:2});
	if(!args) return;
	fn = args.shift();
	path = args.shift();
	fn("Path was " + path);
}

/* Next we test it */

try {

	foo("hello", function(err) {
		console.log(err);
	});
	
	foo(function(err) {
		console.log(err);
	});
	
	foo();

} catch(e) {
	console.log("Exception: " + e);
}

try {
	foo("hello");
} catch(e) {
	console.log("Exception: " + e);
}

try {
	foo("hello", "world", function(err) {
		if(err) {
			console.log("Error: " + err);
		}
	});
} catch(e) {
	console.log("Exception: " + e);
}

try {
	bar(function(err) {
		if(err) {
			console.log("Error: " + err);
		}
	});
} catch(e) {
	console.log("Exception: " + e);
}


/* EOF */
