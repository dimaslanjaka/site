process.cwd = () => __dirname;
import { join } from 'path';
import { Application, copyAllPosts } from '../src';
import { writefile } from '../src/utils/fm';

const results = join(__dirname, 'results');
const api = new Application(__dirname);
api.setConfig({ tags: { lowercase: true } });
writefile(join(results, 'copy-mapper.json'), JSON.stringify(api.getConfig(), null, 2));
copyAllPosts();
