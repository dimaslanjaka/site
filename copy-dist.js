process.cwd = () => __dirname;

const { Application } = require('../dist');

const api = new Application(__dirname);
api
  .clean()
  .then(api.copy)
  .then(() => console.log('done occurs'));
