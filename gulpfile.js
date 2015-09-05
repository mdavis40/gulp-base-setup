'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    minifyjs = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon')

gulp.task('nodemon', function(cb) {
  var started = false

  return nodemon({
    script: 'server.js',
    watch: 'server.js'
  }).on('start', function() {
    if (started) {
      return
    }
    cb()
    started = true
  })
})

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

gulp.task('browserSync', [ 'nodemon' ], function() {
  browserSync({
    files: [ 'dist/**/*.*' ],

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,
  })
})

gulp.task('default', [ 'browserSync', 'sass', 'html', 'js' ], function() {
  gulp.watch('app/scss/**/*.scss', ['sass'])
  gulp.watch('app/index.html', ['html'])
  gulp.watch('app/js/**/*.js', ['js'])
})
