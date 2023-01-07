process.cwd = () => __dirname;

import { beforeEach, describe, test } from '@jest/globals';
import { existsSync } from 'fs';
import { join } from 'upath';
import { Application } from '../src';
import validateClean from './validate-clean';

describe('test copy post without label mapper', function () {
  let api: Application;
  beforeEach(function () {
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
  if (existsSync(join(__dirname, 'tmp'))) {
    test('clean', (done) => {
      validateClean(api, done);
    }, 60000);
  }

  test('copying', async function () {
    await api.copy();
  });
});
