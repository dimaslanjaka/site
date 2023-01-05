process.cwd = () => __dirname;

import { join } from 'path';
import { Application } from '../../../src';
import { writefile } from '../../../src/utils/fm';
import { result_dir } from '../../_config';

(async function () {
  const api = new Application(__dirname);
  api.setConfig({
    generator: {
      cache: false
    }
  });
  // await api.clean();
  writefile(join(result_dir, 'config-mapper.json'), JSON.stringify(api.getConfig(), null, 2));
  api.copy();
})();
