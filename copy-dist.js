process.cwd = () => __dirname;

const { Application } = require('..');
const { chain } = require('../dist/utils/chain');

const api = new Application(__dirname);
chain([{ callback: api.clean }, { callback: api.copy }]);
