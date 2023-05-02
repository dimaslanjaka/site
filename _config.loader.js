const { readFileSync, writeFileSync } = require('fs');
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
  const options = Object.assign(defaults, overriden);
  writeFileSync(join(base, '_config.yml'), stringify(options));
  return options;
}

module.exports = reloadHexoConfigYml;
