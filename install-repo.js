const { spawnAsync } = require('git-command-helper/dist/spawn');
const path = require('path');

(async function () {
  await spawnAsync('npm', ['i', '-D', 'git+https://github.com/dimaslanjaka/static-blog-generator'], { cwd: __dirname, stdio: 'inherit' });
})();
