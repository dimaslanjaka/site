const { copySync } = require('fs-extra');
const { readFileSync, writeFileSync, readdirSync } = require('fs-extra');
const { join } = require('path');
const { parse, stringify } = require('yaml');

/**
 * reload `_config.yml` from `_config.defaults.yml`
 * @param {string} [base] site directory with `_config.defaults.yml` inside
 * @param {import('hexo')['config']&Record<string,any>} overriden new config object to be merged
 * @returns {import('hexo')['config']&Record<string,any>}
 */
function reloadHexoConfigYml(base = undefined, overriden = {}) {
  if (!base) base = __dirname;
  if (!overriden) overriden = {};
  const defaults = parse(readFileSync(join(base, '_config.defaults.yml'), 'utf-8'));
  /** @type {import('hexo')['config']} */
  const options = Object.assign(defaults, overriden);
  writeFileSync(join(base, '_config.yml'), stringify(options));
  const layouts = readdirSync(join(__dirname, 'views')).map((str) => {
    return {
      src: join(join(__dirname, 'views'), str),
      dest: join(join(__dirname, 'themes', options.theme), str)
    };
  });
  layouts.forEach(({ src, dest }) => {
    copySync(src, dest);
  });
  return options;
}

module.exports = reloadHexoConfigYml;

if (require.main === module) {
  reloadHexoConfigYml(__dirname, { theme: 'butterfly' });
}
