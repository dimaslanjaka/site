process.cwd = () => __dirname;
process.env.DEBUG = 'hexo-post-parser,post:permalink';

const { Application } = require('..');
const { chain } = require('../dist/utils/chain');

const api = new Application(__dirname);
chain([
  {
    callback: function () {
      api.setConfig({ permalink: ':title/' });
    }
  },
  { callback: api.clean },
  { callback: api.copy }
]);
