process.cwd = () => __dirname;

import { describe, expect, test } from '@jest/globals';
import { api } from '../src';

describe('test config', function () {
  const app = new api.Application(__dirname);
  test('permalink :title.html', function () {
    expect(app.config.permalink).toBe(':title.html');
  });
  test('permalink :year/:month/:name.html', function () {
    app.setConfig({ permalink: ':year/:month/:name.html' });
    expect(app.config.permalink).toBe(':year/:month/:name.html');
  });
});
