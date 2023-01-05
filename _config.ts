import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { getDefaultConfigYaml } from '../src/defaults';

const def = getDefaultConfigYaml();
const currentYaml = readFileSync(join(__dirname, '_config.yml'), 'utf-8');
const regex = /(# static-blog-generator-start)([\s\S]*?)(# static-blog-generator-end)/gim;
const subst = `$1\n${def}\n$3`;

// The substituted value will be contained in the result variable
const result = currentYaml.replace(regex, subst);

writeFileSync(join(__dirname, '_config.yml'), result);

export const result_dir = join(__dirname, 'results');
