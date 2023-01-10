import { expect, test } from '@jest/globals';
import { readdirSync } from 'fs-extra';
import { join } from 'path';
import { Application } from 'sbg-api';

export default function validateCopy(api: Application) {
  test('run copy', function (done) {
    api.copy().then(() => done());
  }, 60000);
  test('validate total markdown', function () {
    expect(readdirSync(join(__dirname, 'source/_posts')).length).toBeGreaterThan(8);
  });
}
