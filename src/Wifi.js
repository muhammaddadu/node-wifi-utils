/**
 * Wifi
 * @author  Muhammad Dadu
 */
import request from 'request';
import Debug from 'debug';

const debug = Debug('node-wifi-utils:Wifi');


/**
 * Wifi Utils
 */
export default class Wifi {
	static platform: String;

	/**
	 * Scan surrounding WiFi access points
	 * @returns { Promise }
	 */
	static scan(): Promise {
		return new Promise((resolve, reject) => {
			reject('this method has not been implemented');
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
