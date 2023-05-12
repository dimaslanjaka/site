process.cwd = () => __dirname;

import Hexo from 'hexo';
import path from 'path';

const hexo = new Hexo(__dirname);
async function main() {
  await hexo.init();
  await hexo.load(async () => {
    const post = await hexo.render.render({ path: path.join(__dirname, 'source/lang/php.md') });
    console.log(post);
  });
}

main();
