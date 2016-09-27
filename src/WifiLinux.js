/**
 * Darwin Wifi
 * @author  Muhammad Dadu
 */
import Wifi from './Wifi';
import Debug from 'debug';

const debug = Debug('node-wifi-utils:Linux');

/**
 * @extends Wifi
 */
export default class WifiLinux extends Wifi {
	static platform: String = 'linux';
	static scanCmd: String = '/sbin/iwlist scan';

	/**
	 * parses scan output from stdout
	 * @param  { String } data raw stdout data
	 * @return { Array }      access points
	 */
	static parseScan(data) {
		let rows = String(data).split('\n');
		return [];
	}
}
