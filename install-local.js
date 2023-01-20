const { spawnAsync } = require('git-command-helper/dist/spawn');
const path = require('path');
const pkg = require('../package.json')
const dist = path.join(__dirname, '../');

(async function () {
  await spawnAsync('npm', ['install'], { cwd: dist, stdio: 'inherit' });
  await spawnAsync('npm', ['pack'], { cwd: dist, stdio: 'inherit' });
  await spawnAsync('npm', ['i', '-D', `file:../${pkg.name}-${pkg.version}.tgz`], { cwd: __dirname, stdio: 'inherit' });
})();
