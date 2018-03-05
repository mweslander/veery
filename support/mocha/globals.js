const chai = require('chai');
const enzyme = require('enzyme');
const faker = require('faker');
const lodash = require('lodash');
const sinon = require('sinon');
const enzymeAdapterReact15 = require('enzyme-adapter-react-15');

enzyme.configure({ adapter: new enzymeAdapterReact15() });

const document = {
  getElementById: () => {}
};

const screen = {
  width: faker.random.number()
};

global._ = lodash;
global.apiRequest = chai.request.agent;
global.document = document;
global.expect = chai.expect;
global.faker = faker;
global.sandbox = sinon.sandbox;
global.screen = screen;
global.shallow = enzyme.shallow;
