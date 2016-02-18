'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

gulp.task('autoprefixer', function () {
  return gulp.src('css/base.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass:prod', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compress', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass', 'autoprefixer']);
  gulp.watch('./js/**/*.js', ['compress']);
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

gulp.task('release', ['sass:prod', 'autoprefixer', 'compress']);
gulp.task('default', ['sass', 'autoprefixer', 'compress', 'webserver', 'livereload', 'watch']);
