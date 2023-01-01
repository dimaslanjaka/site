process.cwd = () => __dirname;
import { join } from 'path';
import { Application, copyAllPosts } from '../src';
import { writefile } from '../src/utils/fm';

const results = join(__dirname, 'results');
(async function () {
  const api = new Application(__dirname);
  api.setConfig({
    tags: { lowercase: true, mapper: { TS: 'typescript', JS: 'javascript' } },
    categories: { lowercase: true, mapper: { TS: 'typescript', JS: 'javascript' } }
  });
  await api.clean();
  writefile(join(results, 'copy-mapper.json'), JSON.stringify(api.getConfig(), null, 2));
  copyAllPosts();
})();
