/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

function site_add(cb) {

			//: sendanor-administration.sh
			// mkdir -p SITES_DIR
			// chown USERNAME:GROUP SITES_DIR
			// chmod SITES_DIR_PERMS SITES_DIR
			// mkdir -p SITE_DIR
			// chown USERNAME:GROUP SITE_DIR
			// chmod SITE_DIR_PERMS SITE_DIR
			// mkdir -p DOCROOT
			// chown USERNAME:GROUP DOCROOT
			// chmod DOCROOT_PERMS DOCROOT
			// mkdir -p WEBLOGDIR
			// chown root:adm WEBLOGDIR
			// chmod WEBLOGDIR_PERMS WEBLOGDIR
			// mkdir -p SITEWEBLOGDIR
			// chown root:adm SITEWEBLOGDIR
			// chmod SITEWEBLOGDIR_PERMS SITEWEBLOGDIR

			//: a2-enable-fcgid
			// if test ! -e "$vhostdir"/.config; then
			//         mkdir "$vhostdir"/.config
			// fi
			// chown "$username:$group" "$vhostdir"/.config
			// chmod 755 "$vhostdir"/.config
			// 
			// if test ! -f "$vhostdir"/.config/"$site"-php.fcgi; then
			//         cp /usr/local/bin/php-wrapper "$vhostdir"/.config/"$site"-php.fcgi
			// fi
			// chown "$username:$group" "$vhostdir"/.config/"$site"-php.fcgi
			// chmod 700 "$vhostdir"/.config/"$site"-php.fcgi
}

/* EOF */
