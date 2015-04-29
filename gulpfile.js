var browserSync = require('browser-sync');
var concat      = require('gulp-concat');
var del         = require('del');
var gulp        = require('gulp');
var minifyCSS   = require('gulp-minify-css');
var minifyHTML  = require('gulp-minify-html');
var minifyJS    = require('gulp-uglify');
var reload      = browserSync.reload;
var rename      = require('gulp-rename');
var stylus      = require('gulp-stylus');
var nib         = require('nib');
var jshint      = require('gulp-jshint');

// WARNING CORE

var _CORE = [
    'core/class/**/*.js'
];

var _DEV = [
    'dev/**/*.js'
];

var _HTML = [
    'core/static/**/*.html'
];

var _IMGS = [
    'core/media/**/*.png',
    'media/**/*.png'
];

var _LIBS = [
    'libs/**/*.js'
];

var _STYLUS = 'assets/stylus/**/*.styl';

gulp.task('minify-css', function () {
    gulp.src(_STYLUS)
    .pipe(concat('style.min.styl'))
    .pipe(stylus({ use: nib(),  import: ['nib']}))
    .pipe(minifyCSS())
    .pipe(gulp.dest('game/assets/css'))
    .pipe(reload({stream: true, once: true}));
});

gulp.task('core-minify-js', function () {
    gulp.src(_CORE)
    .pipe(concat('devGameJs.min.js'))
    .pipe(minifyJS())
    .pipe(gulp.dest('game/assets/js'))
    .pipe(reload({stream: true, once: true}));
});

gulp.task('dev-minify-js', function () {
    gulp.src(_DEV)
    .pipe(concat('dev.min.js'))
    .pipe(minifyJS())
    .pipe(gulp.dest('game/assets/js'))
    .pipe(reload({stream: true, once: true}));
});

gulp.task('libs-js', function(){
	gulp.src(_LIBS)
    .pipe(concat('libs.min.js'))
    .pipe(minifyJS())
    .pipe(gulp.dest('game/assets/js'))
    .pipe(reload({stream: true, once: true}));
});

gulp.task('lint', function () {
    gulp.src(_CORE)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('minify-html', function () {
    gulp.src(_HTML)
    .pipe(minifyHTML())
    .pipe(gulp.dest('game'))
    .pipe(reload({stream: true, once: true}));
});

gulp.task('copyImgs', function(){
	gulp.src(_IMGS)
    .pipe(gulp.dest('game/assets/img'));
});


gulp.task('watch', function() {
    // Cambios principales
    gulp.watch(_CORE, ['lint', 'core-minify-js']);
    gulp.watch(_DEV, ['lint', 'dev-minify-js']);
    gulp.watch(_STYLUS,      ['minify-css']);
    gulp.watch(_HTML,       ['minify-html']);
});

gulp.task('server-start', function () {
    browserSync({
        notify: false,
        server: 'game/'
    });
});


//Tareas IMPORTANTES

gulp.task('debug', function() {
    gulp.start('lint');
});

gulp.task('dist', ['clean'], function() {
    gulp.start('libs-js', 'copyImgs', 'minify-css', 'minify-html', 'core-minify-js', 'dev-minify-js', 'lint');
});

gulp.task('server', function() {
    gulp.start('lint', 'server-start', 'watch');
});

gulp.task('clean', function(cb) {
    del(['game'], cb);
});
