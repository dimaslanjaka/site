process.cwd = () => __dirname;

const hexoLib = require('hexo');
const { copyAllPosts } = require('..');

copyAllPosts().once('end', function () {
  const hexo = new hexoLib(__dirname);
  hexo.init().then(() => {
    hexo.load().then(() => {
      hexo.call('list', { _: ['post'] }).then(function () {
        // ...
      });
      let posts = hexo.locals.get('posts').toArray().length;
      let pages = hexo.locals.get('pages').toArray().length;
      console.log({ posts, pages });
    });
  });
});