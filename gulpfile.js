process.cwd = () => __dirname;
process.env.NODE_ENV = 'dev';

const path = require('path');
const gulp = require('gulp');
const { gulpCached, gulpDebug } = require('../dist');

gulp.task('test', function () {
  return gulp
    .src('**/*.*', { cwd: path.join(__dirname, 'src-posts') })
    .pipe(gulpDebug())
    .pipe(gulp.dest(path.join(__dirname, 'tmp/test')));
});

gulp.task('test:cache', () => {
  const dest = path.join(__dirname, 'tmp/_posts');
  const cwd = path.join(__dirname, '/src-posts');
  return gulp
    .src('**/*.*', { cwd })
    .pipe(gulpCached({ name: 'test-gulp-cache' }))
    .pipe(gulp.dest(dest));
});
