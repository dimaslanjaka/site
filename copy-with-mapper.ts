process.cwd = () => __dirname;
process.env.DEBUG = 'post:label-assign*,test*';
process.env.DEBUG_HIDE_DATE = 'true';

import debug from 'debug';
import { parsePost } from 'hexo-post-parser';
import { join } from 'path';
import { Application } from '../src';
import { writefile } from '../src/utils/fm';
import { result_dir } from './_config';

(async function () {
  const log = debug('test:copy-mapper');
  const api = new Application(__dirname, {
    generator: {
      cache: false,
      verbose: false,
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
  await api.copy().catch(log);

  log('validating');

  const postAssign = join(__dirname, 'source/_posts/label-assigner.md');
  const parsePostAssign = await parsePost(postAssign, {
    config: api.getConfig()
  }).catch(console.log);
  console.log({ parsePostAssign });
})();
