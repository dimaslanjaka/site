process.cwd = () => __dirname;
process.env.DEBUG = 'post:permalink';

const promiseSpawn = require('hexo-util/dist/spawn');
const sbg = require('../dist');

sbg.util.chain.chain([
  {
    callback: () => promiseSpawn('npm', ['run', 'build:nopack'], { cwd: __dirname + '/../' })
  }
]);

const api = new sbg.Application(__dirname, {
  post_dir: 'original-posts',
  public_dir: 'public',
  exclude: [],
  permalink: ':name.html',
  tags: {
    lowercase: true
  },
  categories: {
    lowercase: true,
    mapper: {
      uncategorized: ''
    }
  }
});
(async function () {
  await api.clean();
  await api.copy();
})();
