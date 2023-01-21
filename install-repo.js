const { spawnAsync } = require('git-command-helper/dist/spawn');

(async function () {
  await spawnAsync('npm', ['i', '-D', 'git+https://github.com/dimaslanjaka/static-blog-generator/tarball/release'], {
    cwd: __dirname,
    stdio: 'inherit'
  });
})();
