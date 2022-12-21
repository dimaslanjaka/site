process.cwd = () => __dirname;

const hexoLib = require('hexo');
const { join } = require('path');
const { copyAllPosts } = require('..');
const { writefile } = require('../dist/utils/fm');

copyAllPosts().once('end', function () {
  const hexo = new hexoLib(__dirname);
  hexo.init().then(() => {
    hexo.load().then(() => {
      hexo.call('list', { _: ['post'] }).then(function () {
        let posts = hexo.locals.get('posts').toArray().length;
        let pages = hexo.locals.get('pages').toArray().length;
        let tags = hexo.locals.get('tags').toArray().length;
        let categories = hexo.locals.get('categories').toArray().length;
        writefile(join(__dirname, 'results/list-post.json'), JSON.stringify({ posts, pages, tags, categories }));
      });
    });
  });
});
