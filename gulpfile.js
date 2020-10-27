'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');


const nodemonTask = (done) => {
  var started = false;
  return nodemon({
    script: 'index.js'
  }).on('start', function() {
    if (!started) {
      done();
      started = true;
    }
  });
}
gulp.task('nodemon', gulp.series(nodemonTask));

const serve = (done) => {
  browserSync.init(null, {
    proxy: "localhost:5000",
    files: '',
    port: 7000,
  });

  gulp.watch("views/*").on('change', browserSync.reload);
  gulp.watch("public/*").on('change', browserSync.reload);

  done();
}
gulp.task('serve', gulp.series('nodemon', serve));

gulp.task('default', gulp.series('serve'));

