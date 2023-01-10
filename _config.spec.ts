process.cwd = () => __dirname;

import { describe, expect, test } from '@jest/globals';
import { api } from '../src';

describe('test config', function () {
  const app = new api.Application(__dirname);
  test(':title.html', function () {
    expect(app.config.permalink).toBe(':title.html');
  });
});
