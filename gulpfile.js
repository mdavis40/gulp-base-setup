'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    minifyjs = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat')

gulp.task('html', function() {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('js', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(concat('app.min.js'))
    .pipe(minifyjs())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('watch', [ 'browserSync', 'sass', 'html', 'js' ], function() {
  gulp.watch('app/scss/**/*.scss', [ 'sass' ])
  gulp.watch('app/index.html', [ 'html' ])
  gulp.watch('app/js/**/*.js', [ 'js' ])
})
