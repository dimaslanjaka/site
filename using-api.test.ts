process.cwd = () => __dirname;

import { describe, expect, jest, test } from '@jest/globals';
import { toUnix } from 'upath';
import { Application } from '../src';

describe('Test API', function () {
  jest.setTimeout(10000);
  jest.spyOn(process, 'cwd');

  test('cwd is test folder', function () {
    expect(toUnix(process.cwd())).toBe(toUnix(__dirname));
  });

  test('clean', async () => {
    const api = new Application(__dirname);
    await api.clean();
  }, 60000);
});
