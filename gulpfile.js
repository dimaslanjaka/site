const path = require('path');
const { gulpDebug, gulp } = require('static-blog-generator');

gulp.task('test', function () {
  return gulp
    .src('**/*.*', { cwd: path.join(__dirname, 'src-posts') })
    .pipe(gulpDebug())
    .pipe(gulp.dest(path.join(__dirname, 'tmp/test')));
});
