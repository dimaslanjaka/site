import { test } from '@jest/globals';
import { Application } from '../src';

export default function validateCopy(api: Application) {
  test('run copy', (done) => {
    api.copy().then(() => done());
  }, 60000);
}
