process.cwd = () => __dirname;

import { describe, expect, test } from '@jest/globals';
import { parsePost } from 'hexo-post-parser';
import moment from 'moment';
import { join } from 'path';
import { Application } from '../src';
import validateClean from './validate-clean';
import validateCopy from './validate-copy';

describe('permalink', function () {
  async function validatePermalink(postPath: string, expected: string) {
    const parse = await parsePost(postPath);
    expect(parse.metadata).not.toBeUndefined();
    if (parse.metadata) {
      expect(parse.metadata.permalink).not.toBeUndefined();
      expect(parse.metadata.permalink).toBe(expected);
    }
  }

  describe(':title.html', function () {
    const api = new Application(__dirname, {
      generator: {
        cache: false,
        verbose: false,
        test: true
      },
      exclude: [],
      permalink: ':title.html'
    });
    describe('clean', () => {
      return validateClean(api);
    });
    describe('copy', () => {
      return validateCopy(api);
    });
    describe('validate', function () {
      test('post with custom permalink', () =>
        validatePermalink(
          join(__dirname, '/source/_posts/with-permalink.md'),
          moment().format('YYYY/MM/') + 'with-permalink.html'
        ));

      test('post without permalink', () =>
        validatePermalink(join(__dirname, '/source/_posts/without-permalink.md'), 'without-permalink.html'));
    });
  });
});