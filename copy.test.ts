process.cwd = () => __dirname;

import { describe } from '@jest/globals';
import { Application } from '../src';
import validateClean from './validate-clean';
import validateCopy from './validate-copy';

describe('test copy post without label mapper', function () {
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

  describe('clean', () => {
    return validateClean(api);
  });

  describe('copy', () => {
    return validateCopy(api);
  });
});
