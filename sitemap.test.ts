process.cwd = () => __dirname;

import { spawnAsync } from 'git-command-helper/dist/spawn';
import { copyAllPosts, hexoGenerateSitemap } from '../src';
import { chain } from '../src/utils/chain';

chain([
  { callback: copyAllPosts },
  {
    callback: function () {
      return spawnAsync('hexo', ['generate'], { cwd: __dirname, stdio: 'inherit' });
    }
  },
  { callback: hexoGenerateSitemap }
]);
