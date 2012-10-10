/* Tests for callback utilities */

/* Conformed function builder */
function conform(opts, fn) {
	var retfn = function() {
		var max_length = opts.max || arguments.length,
		    args = outer_conform(arguments, opts);
		if(!args) return;
		args.reverse();
		while(args.length < max_length) {
			args.unshift(undefined);
		}
		fn.apply(undefined, args);
	};
	return retfn;
}


/* Conforms argument list in reverse order and verifies that first (which was original last defined argument) is an function.
 * @param args Argument list as array.
 * @returns Returns argument list in reverse order. First element is the callback function.
 */
function outer_conform(args, opts) {
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




/* Test functions */



/* Test function */
var foo = conform({max:2}, function(path, fn) {
	fn("Path was " + path);
});

/* Test function */
var bar = conform({min:2, max:2}, function(path, fn) {
	fn("Path was " + path);
});




/* Next we test it */
var test_id = 1;


try {

	console.log('### test ' + (test_id++) + ' ###'); // 1

	foo("hello", function(err) {
		console.log(err);
	});
	
	console.log('### test ' + (test_id++) + ' ###'); // 2

	foo(function(err) {
		console.log(err);
	});
	
	console.log('### test ' + (test_id++) + ' ###'); // 3

	foo();

} catch(e) {
	console.log("Exception: " + e);
}

console.log('### test ' + (test_id++) + ' ###');
try {
	foo("hello");
} catch(e) {
	console.log("Exception: " + e);
}

console.log('### test ' + (test_id++) + ' ###');
try {
	foo("hello", "world", function(err) {
		if(err) {
			console.log("Error: " + err);
		}
	});
} catch(e) {
	console.log("Exception: " + e);
}

console.log('### test ' + (test_id++) + ' ###');
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
