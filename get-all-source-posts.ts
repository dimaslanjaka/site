process.cwd = () => __dirname;

import getSourcePosts from 'sbg-api/dist/post/get-source-posts';

getSourcePosts().then(console.log);
