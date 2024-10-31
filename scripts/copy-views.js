const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const Hexo = require('hexo');
const base_dir = path.join(__dirname, '..');

// copy custom views to theme directory
async function main() {
  const views = path.join(hexo.base_dir, 'views');
  if (fs.existsSync(views)) {
    const layouts = glob.globSync('**/*.njk', { cwd: views, absolute: true }).map((src) => {
      const dest = path.join(hexo.theme_dir, 'layout', path.basename(src));
      return { src, dest };
    });
    const css = glob.globSync('**/*.{css,scss}', { cwd: views, absolute: true }).map((src) => {
      const dest = path.join(hexo.theme_dir, 'source/css', path.basename(src));
      return { src, dest };
    });
    const js = glob.globSync('**/*.js', { cwd: views, absolute: true }).map((src) => {
      const dest = path.join(hexo.theme_dir, 'source/js', path.basename(src));
      return { src, dest };
    });
    const sources = [...layouts, ...css, ...js];
    for (let i = 0; i < sources.length; i++) {
      const data = sources[i];
      fs.copySync(data.src, data.dest, { overwrite: true });
      hexo.log.info('copied', data);
    }
  }
}

if (typeof hexo !== 'undefined') {
  main();
} else {
  const hexo = new Hexo(base_dir);
  hexo
    .init()
    .then(() => hexo.load())
    .then(() => main())
    .then(() => hexo.exit())
    .catch((e) => hexo.exit(e));
}
