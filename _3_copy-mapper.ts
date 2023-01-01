process.cwd = () => __dirname;

import { join } from 'path';
import { Application } from '../src';
import { writefile } from '../src/utils/fm';

const results = join(__dirname, 'results');
(async function () {
  const api = new Application(__dirname);
  api.setConfig({
    tags: { lowercase: true, mapper: { TS: 'typescript', JS: 'javascript' }, assign: { code: 'snippet' } },
    categories: {
      lowercase: true,
      mapper: { TS: 'typescript', JS: 'javascript' },
      assign: { programming: 'javascript' }
    }
  });
  // await api.clean();
  writefile(join(results, 'copy-mapper.json'), JSON.stringify(api.getConfig(), null, 2));
  api.copy();
})();
