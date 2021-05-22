var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-cssnano');
var prefix = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var del = require('del');

gulp.task('test', function(done) {
    console.log('Hello World!');
    done()
});

gulp.task('scripts', function(done) {
    gulp.series('tests', function(done2) {
        gulp.src('app/scripts/**/*.js')
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/scripts'));
        done2();
    });
    done();
})

gulp.task('styles', function(done) {
    gulp.src('app/styles/main.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(prefix())
        .pipe(gulp.dest('dist/styles'));
    done();
});

gulp.task('tests', function(done) {
    gulp.src([ 'app/scripts/main.js', '!app/scripts/vendor/**/*.js' ]) // 
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
    done();
});

gulp.task('clean', function() {
    return del(['dist']);
})

gulp.task('default', function(done) {
    gulp.series("clean", gulp.parallel("styles", "scripts"));
    done();
})