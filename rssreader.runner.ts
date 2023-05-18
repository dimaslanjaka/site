process.cwd = () => __dirname;
import Hexo from 'hexo';
import { rssreader } from '../lib/src/rssreader';
import fs from 'fs';
import path from 'path';

const hexo = new Hexo(__dirname);
hexo.init().then(() => {
  const { callback } = rssreader(hexo);
  callback(
    ['https://www.webmanajemen.com/rss.xml'],
    `
<div style="margin-bottom: 7px; padding: 7px">
  <div style="display: flex">
    <div>$image</div>
    <div><h2>$title</h2></div>
  </div>
  <p>$content</p>
  <a href="$link" rel="follow">Read More</a>
</div>
  `
  ).then((result) => {
    fs.writeFileSync(path.join(__dirname, '../tmp/rss.html'), result);
  });
});
