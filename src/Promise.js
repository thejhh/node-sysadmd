/* Utilities for function handling */

"use strict";

/* TODO: Support for checking argument types. This could even read the source code comment tags and build checks based on documented features. */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

/** Result object constructor */
function Promise() {
	if(!(this instanceof Promise)) {
		return new Promise();
	}
}

// Export the class as module
module.exports = Promise;

/** then */
Promise.prototype.then = function(fulfilledHandler, errorHandler, progressHandler) {

};

/** get */
Promise.prototype.get = function(propertyName) {

};

/** call */
Promise.prototype.call = function(functionName, arg1, arg2, ...) {

};

/* EOF */
