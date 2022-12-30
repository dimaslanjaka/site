process.cwd = () => __dirname;

const { spawnAsync } = require('git-command-helper/dist/spawn');
const { chain } = require('../dist/utils/chain');

chain([
  {
    callback: function () {
      return spawnAsync('hexo', ['generate'], { cwd: __dirname, stdio: 'inherit' });
    }
  }
]);
