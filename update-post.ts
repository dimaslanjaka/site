process.cwd = () => __dirname;

import { updatePost } from '../src/post/copy';

updatePost();
