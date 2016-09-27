/**
 * Darwin Wifi
 * @author  Muhammad Dadu
 */
import Wifi from './Wifi';
import Debug from 'debug';

const debug = Debug('node-wifi-utils:Darwin');

/**
 * @extends Wifi
 */
export default class WifiDarwin extends Wifi {
	static platform: String = 'darwin';
	static scanCmd: String = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -s';


	/**
	 * parses scan output from stdout
	 * @param  { String } data raw stdout data
	 * @return { Array }      access points
	 */
	static parseScan(data) {
		let rows = String(data).split('\n');
		let headerRow = rows.shift();

		return rows
			.map((row) => {
				return String(row).trim().split(/\b\s+/);
			})
			.filter((row) => {
				return row.length > 2;
			})
			.map((row) => {
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
