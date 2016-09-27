/**
 * Wifi
 * @author  Muhammad Dadu
 */
import Debug from 'debug';
import request from 'request';
import * as childProcess from 'child_process';
import _extend from 'util';

const debug = Debug('node-wifi-utils:Wifi');


/**
 * Wifi Utils
 */
export default class Wifi {
	static platform: String;
	static scanCmd: String;

	/**
	 * Scan surrounding WiFi access points
	 * @returns { Promise }
	 */
	static scan(): Promise {
		return new Promise((resolve, reject) => {
			if (!this.scanCmd) {
				return reject('Platform not supported');
			}

			debug('running command %s', this.scanCmd);
			childProcess.exec(this.scanCmd, _extend(process.env, {
				LANG: 'en'
			}), (err, stdout, stderr) => {
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
	 * Returns geolocation using surrounding WiFi access points
	 * @returns { Promise }
	 */
	static location(): Promise {
		return this
			.scan()
			.then(this.locationFromAccessPoints);
	}

	/**
	 * Returns geolocation using surrounding WiFi access points
	 * @returns { Promise }
	 */
	static locationFromAccessPoints(accessPoints: Array): Promise {
		return new Promise((resolve, reject) => {
			let url = 'https://maps.googleapis.com/maps/api/browserlocation/json';
			url += '?browser=node-wifi-utils&sensor=true&wifi=';
			url += accessPoints.map((accessPoint) => {
				return [
					'mac:' + accessPoint.mac,
					'ssid:' + accessPoint.ssid,
					'ss:' + accessPoint.signal_level
				].join('|');
			}).join('&wifi=');

			request({
				method: 'POST',
				url: url,
				json: true
			}, (err, res, body) => {
				if (err) {
					return reject(err);
				}
				let location = {
					accuracy: body.accuracy,
					latitude: body.location.lat,
					longitude: body.location.lng
				};
				debug('location: %s', JSON.stringify(location));

				resolve(location);
			});
		});
	}
}
