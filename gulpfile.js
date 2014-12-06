var gulp = require('gulp');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gifsicle = require('imagemin-gifsicle');
var jpegtran = require('imagemin-jpegtran');
var newer = require('gulp-newer');


var vendor = {
  css: [
    'src/_vendor/normalize.css/normalize.css'
  ],
  js: [
    'src/_vendor/console-polyfill/index.js',
    'src/_vendor/location.origin.js',
    'src/_vendor/instantclick/instantclick.js'
  ]
};

gulp.task('images', function () {
  return gulp.src('src/_images/*')
      .pipe(newer('src/build/images'))
      .pipe(imagemin({
          progressive: true,
          use: [pngquant({ quality: '65-80', speed: 4 }), gifsicle({ interlaced: true }), jpegtran({ progressive: true }) ]
      }))
      .pipe(gulp.dest('src/build/images'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/_images/**', ['images']);
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

gulp.task('default', ['images', 'vendor-css', 'vendor-js', 'watch']);
