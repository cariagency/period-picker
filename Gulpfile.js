// Dependencies.
var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var minCss = require('gulp-minify-css')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify');

// Config.
var config = {
    scss: 'src/**/*.scss',
    js: 'src/**/*.js',
    dist: 'dist'
};

// Compile SCSS files.
gulp.task('css', function (cb) {
    gulp.src(config.scss)
            // output non-minified CSS file
            .pipe(sass({
                outputStyle: 'expanded'
            }).on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulp.dest(config.dist))

            // output the minified version
            .pipe(minCss())
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest(config.dist));

    cb();
});

// Compile JS files.
gulp.task('js', function () {
    gulp.src(config.js)
            .pipe(gulp.dest(config.dist))
            .pipe(uglify())
            .pipe(rename({extname: '.min.js'}))
            .pipe(gulp.dest(config.dist));
});

// Watch for file changes.
gulp.task('watch', function (cb) {
    gulp.watch(config.scss, ['css']);
    gulp.watch(config.js, ['js']);
});

// Compile all files.
gulp.task('dist', ['css', 'js']);

// Default.
gulp.task('default', ['dist', 'watch']);