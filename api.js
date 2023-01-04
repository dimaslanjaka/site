const path = require('path');
const through2 = require('through2');

process.cwd = () => path.resolve(__dirname);

const { Application, taskSafelink, taskSeo } = require('../dist');
const { createDuplexStream } = require('../dist/utils/stream');

const public = path.join(__dirname, 'public');
const api = new Application(__dirname);
(async () => {
  await api.copy();
  await api.generate();
  await new Promise((resolve) => {
    createDuplexStream(through2.obj(taskSafelink(null, public)).pipe(taskSeo(null, public)).once('end', resolve));
  });
})();
