/**
 * Test for Execute
 */
import Wifi from '..';
import * as fs from 'fs';
import * as path from 'path';

const samepleResultsPath = path.join(__dirname, 'mocks/darwinScan.txt');
const samepleResults = fs.readFileSync(samepleResultsPath);

describe('Scan test', function () {

	it('test platform scan result parse', function () {
		let accessPoints = Wifi.parseScan(samepleResults);
		accessPoints.forEach((row) => {
			expect(row.ssid).not.equal(undefined);
			expect(row.mac).not.equal(undefined);
			expect(row.rssi).not.equal(undefined);
			expect(row.channels).not.equal(undefined);
			expect(row.securityTypes).not.equal(undefined);
		});
	});

	it('scan surrounding WiFi access points', function (done) {
		this.timeout(10000);

		Wifi.scan()
			.then((accessPoints) => {
				expect(accessPoints).not.equal(undefined);
				done();
			}, (err) => {
				expect(err).equal(undefined);
				done();
			});
	});

	it('location test', function (done) {
		this.timeout(10000);

		let accessPoints = Wifi.parseScan(samepleResults);

		Wifi.locationFromAccessPoints(accessPoints)
			.then((location) => {
				expect(location.accuracy).not.equal(undefined);
				expect(location.latitude).not.equal(undefined);
				expect(location.longitude).not.equal(undefined);
				done();
			}, (err) => {
				expect(err).equal(undefined);
				done();
			});
	});
});
