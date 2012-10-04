/* System Administration Daemon */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

function mysql_list(cb) {
}

function mysql_add(cb) {
			// sql: CREATE DATABASE `(DATABASE)`
			// sql: GRANT ALL PRIVILEGES ON `(DATABASE)`.* TO '(USERNAME)'@'localhost' IDENTIFIED BY '(PASSWORD)'
			// sql: FLUSH PRIVILEGES
			
			// :Backup?
			// mkdir -p /etc/backup.nightly
			// num="`ls /etc/backup.nightly/|grep '^[0-9]'|sort -n|tail -n 1|sed 's/[^0-9].\+$/+1/'|calc -p`"
			// file="/etc/backup.nightly/$num-mysql-database-$database"
			// cat > "$file" << "EOF"
			// #!/bin/sh
			// name="`basename $0|sed -e 's/^[0-9]\+\-mysql\-database\-//'`"
			// /usr/sbin/backup-database.sh \
			//         --fileformat='%Y%m%d-%H%M%S-atlas-mysql-database-'"$name" \
			//         --backup-database="$name" || exit 1
			// exit 0
			// EOF
			// chmod 700 "$file"
}

/* EOF */
