const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

// copy custom views to theme directory

if (typeof hexo !== 'undefined') {
  const views = path.join(hexo.base_dir, 'views');
  if (fs.existsSync(views)) {
    const layouts = glob.globSync('**/*.njk', { cwd: views, absolute: true }).map((src) => {
      const dest = path.join(hexo.theme_dir, 'layout', path.basename(src));
      return { src, dest };
    });
    const sources = [...layouts];
    for (let i = 0; i < sources.length; i++) {
      const data = sources[i];
      fs.copySync(data.src, data.dest, { overwrite: true });
      hexo.log.info('copied', data);
    }
  }
}
