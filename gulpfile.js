'use strict'

var gulp = require('gulp')

var guppy = require('git-guppy')(gulp)
var gulpFilter = require('gulp-filter')
var eslint = require('gulp-eslint')
var jscs = require('gulp-jscs')

function lintFiles(files) {
  return gulp.src(files)
    .pipe(gulpFilter(['*.js']))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(jscs({
      configPath: '.jscsrc'
    }))
}

gulp.task('lint', function() {
  return lintFiles([
    'web.js',
    'web/**/*.js',
    'test/**/*.js'
  ])
});

gulp.task('pre-commit', guppy.src('pre-commit', function(filesBeingCommitted) {
  return lintFiles(filesBeingCommitted);
}));

