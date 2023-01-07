process.cwd = () => __dirname;

import { beforeEach, describe, expect, test } from '@jest/globals';
import { existsSync } from 'fs';
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
  if (existsSync(join(__dirname, 'tmp'))) {
    test('clean', (done) => {
      api.clean().then(() => validateClean(api, done));
    }, 60000);
  }
  test('copying', async () => {
    await api.copy();
  }, 60000);
  test('label assign (add label based on config.tags|categories.assign key)', async () => {
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
  });
  test('label mapper (label replacer)', async () => {
    const postAssign = join(__dirname, 'source/_posts/label-mapper.md');
    const parsePostAssign = await parsePost(postAssign, {
      config: api.getConfig()
    });
    expect(parsePostAssign).not.toBeUndefined();
    if (parsePostAssign) {
      const { metadata } = parsePostAssign;
      expect(metadata).not.toBeUndefined();
      expect(metadata).toHaveProperty('tags', ['typescript', 'javascript']);
      expect(metadata).toHaveProperty('categories', ['typescript', 'javascript']);
    }
  });
});
