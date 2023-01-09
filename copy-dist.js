process.cwd = () => __dirname;
process.env.DEBUG = 'hexo-post-parser,post:permalink';

const promiseSpawn = require('hexo-util/dist/spawn');
const { Application } = require('..');
const { chain } = require('../dist/utils/chain');

const api = new Application(__dirname);
chain([
  {
    callback: () => promiseSpawn('npm', ['run', 'build:nopack'], { cwd: __dirname + '/../' })
  },
  {
    callback: function () {
      api.setConfig({ permalink: ':name/' });
      return chain([{ callback: api.clean }, { callback: api.copy }]);
    }
  }
]);
