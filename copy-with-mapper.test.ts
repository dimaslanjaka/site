process.cwd = () => __dirname;

import { beforeEach, describe, expect, test } from '@jest/globals';
import { parsePost } from 'hexo-post-parser';
import { join } from 'upath';
import { Application } from '../src';
import validateClean from './validate-clean';

describe('test copy post with label mapper', function () {
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
  test('clean', () => validateClean(api), 60000);
  test('label assign test', async () => {
    const postAssign = join(__dirname, 'source/_posts/label-assigner.md');
    const parsePostAssign = await parsePost(postAssign, {
      config: api.getConfig()
    });
    expect(parsePostAssign).not.toBeUndefined();
    if (parsePostAssign) {
      const { metadata } = parsePostAssign;
      expect(metadata).not.toBeUndefined();
      expect(metadata).toHaveProperty('tags', ['code', 'snippet']);
      expect(metadata).toHaveProperty('categories', ['programming', 'javascript']);
    }
  }, 60000);
});
