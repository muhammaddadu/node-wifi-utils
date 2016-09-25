/**
 * Darwin Wifi
 * @author  Muhammad Dadu
 */
import Wifi from './Wifi';
import * as childProcess from 'child_process';
import Debug from 'debug';

const debug = Debug('node-wifi-utils:Darwin');
const provider = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport';

/**
 * @extends Wifi
 */
export default class WifiDarwin extends Wifi {
	static platform: string = 'darwin';

	/**
	* @override
	*/
	static scan(): Promise {
		return new Promise((resolve, reject) => {
			let cmd = `${provider} -s`;
			debug('running command %s', cmd);
			childProcess.exec(cmd, (err, stdout, stderr) => {
				if (err) {
					debug('error: %s', err);
					return reject(err);
				}
				debug('stdout: %s', stdout);
				debug('stderr: %s', stderr);
				return resolve(this.parseScan(stdout));
			});
		});
	}

	/**
	 * parses scan output from stdout
	 * @param  { String } data raw stdout data
	 * @return { Array }      access points
	 */
	static parseScan(data) {
		let rows = String(data).split('\n');
		let headerRow = rows.shift();

		rows = rows
				.map((row) => {
					return String(row).trim().split(/\b\s+/);
				}).filter((row) => {
					return row.length > 2;
				});

		return rows.map((row) => {
			let accessPoint = {
				ssid : row[0],
				mac : row[1],
				rssi : row[2],
				channels : row[3] && row[3].split(','),
				securityTypes : String(row[6] || row[5] && row[5].replace('-- ', '')).split(' ')
			};

			debug('accessPoint: %s', JSON.stringify(accessPoint));
			return accessPoint;
		});
	}
}
