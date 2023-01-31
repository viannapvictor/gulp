const gulp = require('gulp')
const gulpConcat = require('gulp-concat')
const cssMin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')

function tarefasCss(cb) {

    return gulp.src('./vendor/**/*.css')
        .pipe(gulpConcat('libs.css'))
        .pipe(cssMin())
        .pipe(rename({suffix: '.min'})) //libs.min.css
        .pipe(gulp.dest('./dist/css'))

}

function tarefasJs() {
    return gulp.src('./vendor/**/*.js')
        .pipe(gulpConcat('libs.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'))
}

exports.styles = tarefasCss
exports.scripts = tarefasJs