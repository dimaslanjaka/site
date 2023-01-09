process.cwd = () => __dirname;
process.env.DEBUG = 'post:permalink';

const { Application } = require('../dist');

const api = new Application(__dirname, {
  post_dir: 'original-posts',
  public_dir: 'public',
  exclude: [],
  permalink: ':name.html',
  tags: {
    lowercase: true
  },
  categories: {
    lowercase: true,
    mapper: {
      uncategorized: ''
    }
  }
});
(async function () {
  await api.clean();
  await api.copy();
})();
