var gulp = require('gulp');
var bower = require("gulp-bower");
var clean = require('gulp-clean');
var watchLess = require('gulp-watch-less');
var less = require('gulp-less');
var path = require('path');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');

gulp.task('default', ['bower'], function () {

});

gulp.task('lint', function () {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default', {
      verbose: true
    }));
});

//download libs
gulp.task('bower', function () {
  return bower();
});

//from less to css
gulp.task('less', function () {
  gulp.src('**/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

//reduce size img
gulp.task('img', function () {
  return gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('img'));
});

gulp.task('styles', function () {
  gulp.src('css/*.css')
    .pipe(autoprefixer())
    .pipe(size())
    .pipe(gulp.dest('css/styles.css'));
});