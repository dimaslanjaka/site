const { spawnAsync } = require('git-command-helper/dist/spawn');
const path = require('path');

const dist = path.join(__dirname, '../');

(async function () {
  await spawnAsync('npm', ['pack'], { cwd: dist, stdio: 'inherit' });
  await spawnAsync('npm', ['i', '-D', 'file:../static-blog-generator-3.0.0.tgz'], { cwd: __dirname, stdio: 'inherit' });
})();
