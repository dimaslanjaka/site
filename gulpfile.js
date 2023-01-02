process.cwd = () => __dirname;
process.env.NODE_ENV = 'dev';

const path = require('path');
const gulp = require('gulp');
const { gulpCached, gulpDebug, copyAllPosts } = require('../dist');
const { cleanOldArchives, cleanDb } = require('../dist/gulp.clean');
const { chain } = require('../dist/utils/chain');
require('static-blog-generator/dist/gulpfile');

gulp.task('test:debug', function () {
  return gulp
    .src('**/*.*', { cwd: path.join(__dirname, 'src-posts') })
    .pipe(gulpDebug())
    .pipe(gulp.dest(path.join(__dirname, 'tmp/test')));
});

const testCached = () => {
  const dest = path.join(__dirname, 'tmp/_posts');
  const cwd = path.join(__dirname, '/src-posts');
  return gulp
    .src('**/*.*', { cwd })
    .pipe(gulpCached({ name: 'test-gulp-cache' }))
    .pipe(gulp.dest(dest));
};
const testNotCached = () => {
  return chain([{ callback: cleanDb }, { callback: testCached }]);
};

gulp.task('test:cache', gulp.series([testNotCached, testCached]));

gulp.task('test:clean-archive', function () {
  return chain([{ callback: cleanDb }, { callback: copyAllPosts }, { callback: cleanOldArchives }]);
});
