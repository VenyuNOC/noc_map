var gulp = require('gulp');
var sass = require('gulp-sass');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var tsify = require('tsify');
const { createCaseBlock } = require('typescript');


gulp.task('copy-html', function (cb) {
    gulp
        .src('./src/html/**/*.html')
        .pipe(gulp.dest('./dist/'));
    cb();
});

gulp.task('copy-images', function (cb) {
    gulp
        .src('./node_modules/leaflet/dist/images/**/*.png')
        .pipe(gulp.dest('./dist/images/'));
    cb();
});

gulp.task('copy-statics', function (cb) {
    gulp.parallel(
        'copy-images',
        'copy-html'
    );
    cb();
});

gulp.task('sassify', function (cb) {
    gulp
        .src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'));
    cb();
});

gulp.task('browserify', function () {
    return browserify()
        .add('./src/ts/network_map.ts')
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist/js/'))
});

gulp.task('default', function (cb) {
    gulp.series(
        gulp.task('watch-html', function(cb) {
            gulp.watch('./src/html/**/*.html', gulp.task('copy-html'));
            cb();
        }),
        gulp.task('watch-sass', function(cb) {
            gulp.watch('./scss/**/*.scss', gulp.task('sassify'));
            cb();
        }),
        gulp.task('watch-ts', function(cb) {
            gulp.watch('./src/ts/**/*.ts', gulp.task('browserify'));
            cb();
        })  
    );
    cb();
});

gulp.task('build', function (cb) {
    gulp.series(
        'copy-statics',
        'browserify',
        'sassify'
    );
    cb();
});