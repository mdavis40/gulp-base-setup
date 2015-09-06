'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    minifyjs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync'),
    bower = require('gulp-bower')

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

gulp.task('bower', function() {
  return bower('bower_components')
    .pipe(gulp.dest('dist/lib'))
})

gulp.task('index', function() {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('templates', function() {
  return gulp.src('app/html/**/*.html')
    .pipe(gulp.dest('dist/html'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('svg', function() {
  return gulp.src('app/fonts/**/*.svg')
    .pipe(gulp.dest('dist/fonts'))
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

gulp.task('default', [ 'bower', 'browserSync', 'sass', 'index', 'templates', 'js', 'svg' ], function() {
  gulp.watch('app/scss/**/*.scss', [ 'sass' ])
  gulp.watch('app/index.html', [ 'index' ])
  gulp.watch('app/html/**/*.html', [ 'templates' ])
  gulp.watch('app/js/**/*.js', [ 'js' ])
  gulp.watch('app/fonts/**/*.svg', [ 'svg' ])
})
