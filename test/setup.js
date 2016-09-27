/**
 * Setup Tests
 */
import { expect } from 'chai';
import { platfrom } from 'os';

global.chai = require('chai');
global.chai.use(require('sinon-chai'));
global.expect = global.chai.expect;
global.sinon = require('sinon');
