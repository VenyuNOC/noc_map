var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('sass', function(cb) {
  gulp
    .src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/'));
  cb();
});

gulp.task('browserify', function() {
  gulp.src()

  return browserify('js/network_map.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-html', function() {
  gulp
    .src('html/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-images', function() {
  gulp
    .src('node_modules/leaflet/dist/images/*.png')
    .pipe(gulp.dest('dist/'));
});

gulp.task(
  'default',
  gulp.parallel(
    gulp.series('browserify', function(cb) {
      gulp.watch('js/*.js', gulp.task('browserify'))
      cb();
    }),
    gulp.series('copy-html', function(cb) {
      gulp.watch('html/*.html', gulp.task('copy-html'))
      cb()
    }),
    gulp.series('sass', function(cb) {
      gulp.watch('scss/*.scss', gulp.task('sass'))
      cb()
    }),
    gulp.series('copy-images', function(cb) {
      gulp.watch('node_modules/leaflet/dist/images/*.png', gulp.task('copy-images'))
      cb()
    })
  )
);