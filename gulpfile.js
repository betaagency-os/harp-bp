var gulp = require('gulp');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var vendor = {
  css: [
    'src/_vendor/normalize.css/normalize.css',
  ],
  js: [
    'src/_vendor/console-polyfill/index.js',
    'src/_vendor/location.origin.js'
  ]
};

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['src/build/**', 'src/**.jade', 'src/javascripts/**']).on('change', livereload.changed);
});

gulp.task('vendor-css', function() {
  return gulp.src(vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('src/build/'));
});

gulp.task('vendor-js', function() {
  return gulp.src(vendor.js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('src/build/'));
});

gulp.task('default', ['watch', 'vendor-css', 'vendor-js']);
