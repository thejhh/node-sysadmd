/* Utilities for function handling */

/* TODO: Support for checking argument types. This could even read the source code comment tags and build checks based on documented features. */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var mod = module.exports = {},
	json_schema = require('json-schema');

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

/* Conforms argument list in reverse order and verifies that first (which was original last defined argument) is an function.
 * @param args Argument list as array.
 * @returns Returns argument list in reverse order. First element is the callback function.
 */
function do_conform(args, opts) {
	var arg, fn, validate;
	try {
		opts = opts || {};
		args = Array.prototype.slice.call(args);
		validate = opts.validate || [];
		
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
		
		// Check validate
		if(!(validate instanceof Array)) {
			throw new TypeError("opts.validate must be an Array!");
		} else if(validate.length !== 0) {
			(function(){
				var i = args.length - 1;
				for(; i !== 0; i -= 1) {
					(function(){
						if(!validate[i]) return;
						var result = json_schema.validate(args[i], validate[i]), msgs = [];
						if(!result.valid) {
							foreach(result.errors).each(function(p) {
								msgs.push( p.property + ' - ' + p.message );
							});
							throw new TypeError("Argument #" + i + " was invalid: " + msgs.join(', '));
						}
					})();
				}
			})();
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

/* Conformed function builder */
mod.conform = function(opts, fn) {
	var retfn = function() {
		var max_length = opts.max || arguments.length,
		    args = do_conform(arguments, opts);
		if(!args) {
			return;
		}
		args.reverse();
		while(args.length < max_length) {
			args.unshift(undefined);
		}
		fn.apply(undefined, args);
	};
	return retfn;
};

/* EOF */
