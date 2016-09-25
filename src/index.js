/**
 * Node.js project base
 * loads the correct class for platform
 * @author  Muhammad Dadu
 */
import { platform } from 'os';
import * as fs from 'fs';
import * as path from 'path';
import Debug from 'debug';

const debug = Debug('node-wifi-utils:index');

/**
 * Find correct class for platforms;
 * - aix
 * - darwin (supported)
 * - freebsd
 * - linux
 * - openbsd
 * - sunos
 * - win32
 */
const className = `Wifi${platform().charAt(0).toUpperCase()}${platform().slice(1)}`;
const classPath = path.join(__dirname, className + '.js');

debug('looking for className: %s for platform: %s', className, platform());
if (!fs.existsSync(classPath)) {
	throw new Error(`module not supported for platform ${platform}`);
}

const Wifi = require(classPath);

export default Wifi;
