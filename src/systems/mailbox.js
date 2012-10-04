/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */


function mailbox_add(cb) {
			// [:groupadd if no group]
			// useradd -g GROUP -k /etc/skel.mailbox -s /usr/local/bin/mailbox-shell.sh -d HOME -m -p CRYPTED_PASSWORD USERNAME
			// adduser USERNAME mailbox
			// mkdir -p HOME
			// chmod HOME_PERMS HOME
			// chown USERNAME:GROUP HOME
}

/* EOF */
