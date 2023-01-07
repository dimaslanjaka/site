process.cwd = () => __dirname;
if (!process.env.DEBUG) process.env.DEBUG = 'post:label-assign*,test*';
if (!process.env.DEBUG_HIDE_DATE) process.env.DEBUG_HIDE_DATE = 'true';
import { Application } from '../src';

const api = new Application(__dirname, {
  generator: {
    cache: false,
    verbose: false,
    test: true
  },
  exclude: [],
  permalink: '/:month/:title/',
  tags: { lowercase: true, mapper: { TS: 'typescript', JS: 'javascript' }, assign: { code: 'snippet' } },
  categories: {
    lowercase: true,
    mapper: { TS: 'typescript', JS: 'javascript' },
    assign: { programming: 'javascript' }
  }
});

api
  .clean()
  .then(() => console.log('done clean'))
  .then(api.copy)
  .then(() => console.log('done copy'))
  .finally(() => console.log('finnaly triggered'));
