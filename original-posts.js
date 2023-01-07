process.cwd = () => __dirname;

const { Application } = require('../dist');

const api = new Application(__dirname, {
  post_dir: 'original-posts',
  public_dir: 'public',
  exclude: []
});
api.clean().then(api.copy);
