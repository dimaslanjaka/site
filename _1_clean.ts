process.cwd = () => __dirname;

import { existsSync } from 'fs';
import { join } from 'path';
import { cleanDb } from '../src';
import { writefile } from '../src/utils/fm';

cleanDb().then(() => {
  writefile(
    join(__dirname, 'results/clean.json'),
    JSON.stringify({
      tmp: existsSync(join(__dirname, 'tmp')),
      source_post: existsSync(join(__dirname, 'source/_posts')),
      public: existsSync(join(__dirname, 'public'))
    })
  );
});
