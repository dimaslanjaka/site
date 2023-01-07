process.cwd = () => __dirname;

import { expect } from '@jest/globals';
import { existsSync } from 'fs';
import { join } from 'upath';
import { Application } from '../src';

export default async function validateClean(api: Application) {
  await api.clean('all');
  expect(existsSync(join(__dirname, 'tmp'))).toBeFalsy();
  expect(existsSync(join(__dirname, api.getConfig().source_dir, '_posts'))).toBeFalsy();
  expect(existsSync(join(__dirname, api.getConfig().source_dir, api.getConfig().public_dir))).toBeFalsy();
  if (existsSync(join(__dirname, '.deploy_' + api.getConfig().deploy.type))) {
    expect(existsSync(join(__dirname, '.deploy_' + api.getConfig().deploy.type, api.getConfig().tag_dir))).toBeFalsy();
    expect(
      existsSync(join(__dirname, '.deploy_' + api.getConfig().deploy.type, api.getConfig().category_dir))
    ).toBeFalsy();
  }
}
