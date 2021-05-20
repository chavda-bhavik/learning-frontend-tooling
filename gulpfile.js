var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-cssnano');
var prefix = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');

gulp.task('test', function(done) {
    console.log('Hello World!');
    done()
});

gulp.task('scripts', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
})

gulp.task('styles', function() {
    return gulp.src('app/styles/main.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(prefix())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('test', function() {
    return gulp.src([ 'app/scripts/main.js', '!app/scripts/vendor/**/*.js' ]) // 
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});