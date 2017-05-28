var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var print = require('gulp-print');


var webpack = require('webpack');
var webpackStream = require('webpack-stream');

gulp.task('less', function () {
  return gulp.src('../.src/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('../public'));
});

gulp.task("webpack",function () {

  return gulp.src('../.src/client.js')
    .pipe(webpackStream(require('./webpack.js'),webpack))
    .on('error', function handleError() {
      console.log('Error compiling JS');
      this.emit('end');
    })
    .pipe(gulp.dest('../public'));
});

gulp.task('watch', ['less','webpack'] ,function(){
  gulp.watch('../.src/**/*.less', ['less']);
  gulp.watch('../.src/**/*.js', ['webpack']);
});

gulp.task('default', ['less', 'webpack'], function () {
  return true;
});