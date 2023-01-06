process.cwd = () => __dirname;

import { join } from 'path';
import { Application } from '../src';
import { writefile } from '../src/utils/fm';
import { result_dir } from './_config';

(async function () {
  const api = new Application(__dirname, {
    generator: {
      cache: false,
      verbose: true,
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
  await api.clean();
  await writefile(join(result_dir, 'config-mapper.json'), JSON.stringify(api.getConfig(), null, 2), {
    async: true
  }).then((o) => console.log('generated config', o.file));
  await api.copy();
})();
