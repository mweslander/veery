const chai = require('chai');
const enzyme = require('enzyme');
const faker = require('faker');
const sinon = require('sinon');
const enzymeAdapterReact15 = require('enzyme-adapter-react-15');

enzyme.configure({ adapter: new enzymeAdapterReact15() });

global.apiRequest = chai.request.agent;
global.expect = chai.expect;
global.faker = faker;
global.sandbox = sinon.sandbox;
global.shallow = enzyme.shallow;
