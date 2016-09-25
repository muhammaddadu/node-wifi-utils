/**
 * Test for Execute
 */
import Wifi from '..';

describe('Module spec test', function () {
	it('has module loaded', () => {
		expect(typeof Wifi).not.equal('undefined');
	});

	it('does module meet spec', () => {
		expect(typeof Wifi.scan).equal('function');
		expect(typeof Wifi.location).equal('function');
	});
});
