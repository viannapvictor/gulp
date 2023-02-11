
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const image = require('gulp-imagemin')
const imagemin = require('gulp-imagemin')
const stripJs = require('gulp-strip-comments')
const stripCss = require('gulp-strip-css-comments')
const htmlmin = require('gulp-htmlmin')
const { series, parallel } = require('gulp')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const sass = require('gulp-sass')(require('node-sass'))

function tarefasCSS(cb) {

    gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
        './vendor/owl/css/owl.css',
        './vendor/jquery-ui-1.13.2.custom/jquery-ui.css'
    ])
        .pipe(stripCss())   
        .pipe(concat('libs.css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min'})) // para gerar o final do arquivo conforme o nome: """libs.min.css"""
        .pipe(gulp.dest('./dist/css'))

      cb()

}

function tarefasSASS(callback) {

    gulp.src('./src/scss/**/*.css')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))

    callback()
}

function tarefasJS(callback){

    gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './vendor/owl/js/owl.js',
        './vendor/jquery-mask/jquery.mask.js',
        //'./vendor/jquery-ui-1.13.2.custom/jquery-ui.js',
        './node_modules/@fortawesome/fontawesome-free/js/fontawesome.js',
        './src/js/custom.js'

    ])
        .pipe(babel({
            comments: false,
            presets: ['@babel/env']
    }))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min'})) //libs.min.js
        .pipe(gulp.dest('./dist/js'))

      return callback()
}

function tarefasImagem(){
    
    return gulp.src('./src/images/*')
        .pipe(imagemin({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
}

function tarefasHTML(callback) {

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))

    return callback()

}

gulp.task('serve', function(){

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on('change', process) // repete o processo quando alterar algo em src
    gulp.watch('./src/**/*').on('change', reload)

})

function end(callback) {
    console.log("Concluded")
    return callback()
}

const process = series( tarefasHTML, tarefasJS, tarefasCSS, tarefasSASS, end)

exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem
exports.sass = tarefasSASS

exports.default = process