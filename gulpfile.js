var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['src/*.jade', 'src/prebuild/**', 'src/images/**', 'src/*.js']).on('change', livereload.changed);
});

gulp.task('default', ['watch']);
