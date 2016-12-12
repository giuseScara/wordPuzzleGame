var gulp = require('gulp'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  del = require('del'),
  bower = require("gulp-bower");

var pathExtLib = "./bower_components/",
  extLibs = "app/ext_libs/";

//download libs
gulp.task('bower', function () {
  return bower();
});

gulp.task('less', function () {
  gulp.src('**/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});


// Clean
gulp.task('clean', function () {
  return del([extLibs], {
    force: true
  });
});

gulp.task('lib_js', function () {
  var libs = [
    pathExtLib + 'angular/angular.min.js',
    pathExtLib + 'angular-route/angular-route.min.js',
    pathExtLib + 'angular-mocks/angular-mocks.js',
    pathExtLib + 'jquery/dist/jquery.min.js',
    pathExtLib + 'requirejs/require.js',
    pathExtLib + 'angular-timer/dist/angular-timer.min',
    pathExtLib + 'bootstrap/dist/js/bootstrap.min.js',
    pathExtLib + 'firebase/firebase.js',
    pathExtLib + 'moment/min/moment.min.js',
    pathExtLib + 'humanize-duration/humanize-duration.js',
    pathExtLib + 'require-css/css.min.js'
    ];

  return gulp.src(libs)
    .pipe(rename(function (path) {
      path.dirname += "/" + path.basename;
      return path;
    }))
    .pipe(gulp.dest(extLibs));
});

gulp.task('lib_css', function () {
  var libs = [
    pathExtLib + 'bootstrap/dist/css/bootstrap.min.css',
    pathExtLib + 'bootstrap/dist/css/bootstrap.min.css.map'

    ];

  return gulp.src(libs)
    .pipe(rename(function (path) {
      path.dirname += "/" + path.basename;
      return path;
    }))
    .pipe(gulp.dest(extLibs));
});

// Default task
gulp.task('default', ['clean', 'bower'], function () {
  gulp.start('lib_js', 'lib_css');
});


gulp.task('browser-sync', ['default'], function () {
  var files = [
      'app/view/**/*.*',
      'app/styles/**/*.css',
      'app/images/**/*.jpg',
      'app/scripts/**/*.js'
   ];

  browserSync.init(files, {
    server: {
      baseDir: "app",
      index: "index.html"
    }
  });
  // Watch any files in dist/, reload on change
  gulp.watch(['app/**']).on('change', browserSync.reload);

});
