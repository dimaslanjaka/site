process.cwd = () => __dirname;
process.env.DEBUG = 'post:label,clean';

const { Application } = require('../dist');

const api = new Application(__dirname, {
  post_dir: 'original-posts',
  public_dir: 'public',
  exclude: [],
  permalink: ':title.html',
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
