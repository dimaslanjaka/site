process.cwd = () => __dirname;

import { beforeAll, describe, test } from '@jest/globals';
import { Application } from '../src';
import validateClean from './validate-clean';
import validateCopy from './validate-copy';

describe('test copy post without label mapper', function () {
  let api: Application;
  beforeAll(function () {
    api = new Application(__dirname, {
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
  });

  test('clean', (done) => {
    validateClean(api, done);
  }, 60000);

  test('copying', (done) => {
    validateCopy(api, done);
  }, 60000);
});
