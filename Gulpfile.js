/*jslint node: true */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var i18n = require('gulp-i18n-localize');
var rename = require('gulp-rename');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass:prod', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compress', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./js/**/*.js', ['compress']);
  gulp.watch('./src/*.tmpl', ['generate-index']);
});

gulp.task('livereload', function() {
  gulp.src(['dist/*.css', 'dist/*.js'])
    .pipe(watch(['dist/*.css', 'dist/*.js']))
    .pipe(connect.reload());
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('translate', function(){
  return gulp.src('src/index.tmpl')
    .pipe(i18n({
      locales: ['en-US', 'es-ES'],
      localeDir: './locales',
      schema: "suffix"
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('generate-index', ['translate'], function() {
  return gulp.src("./dist/*.tmpl")
    .pipe(rename(function (path) {
     var filenameSegments = path.basename.split('-');

     if (path.basename.indexOf("es-ES") > -1) {
       path.basename = "index";
     } else {
       path.basename = filenameSegments[1];
     }

     path.extname = ".html";
    }))
  .pipe(gulp.dest("./"));
});

gulp.task('release', ['sass:prod', 'compress']);
gulp.task('default', ['generate-index', 'sass', 'compress', 'webserver', 'livereload', 'watch']);
