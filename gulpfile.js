var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-cssnano');
var prefix = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var del = require('del');
var bSync = require('browser-sync');

var wiredep = require('wiredep').stream;
var mainBowerFiles = require('main-bower-files');

gulp.task('test', function(done) {
    console.log('Hello World!');
    done()
});

gulp.task('tests', function() {
    return gulp.src(['app/scripts/**/*.js', '!app/scripts/vendor/**/*.js']) // 
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task(
    'scripts', 
    gulp.series('tests', function scriptsInternal() {
        var glob = mainBowerFiles('*.js');
        glob.push('app/scripts/**/*.js');
        return gulp.src(glob)
                .pipe(concat('main.min.js'))
                .pipe(uglify())
                .pipe(gulp.dest('dist/scripts'))
    })
);

gulp.task('styles', function(done) {
    gulp.src('app/styles/main.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(prefix())
        .pipe(gulp.dest('dist/styles'));
    done();
});

gulp.task('clean', function() {
    return del(['dist/*']);
});

gulp.task('server', function(done) {
    bSync({
        server: {
            baseDir: ['dist', 'app']
        }
    });
    done();
});

gulp.task("watch", 
    gulp.series(
        "server", 
        function watchInternal() {
            gulp.watch(['app/scripts/**/*.js', '!app/scripts/vendor/**/*.js'], gulp.parallel('scripts'));
            gulp.watch('app/styles/**/*.less', gulp.parallel('styles'));
            gulp.watch('dist/**/*', bSync.reload);
        }
    )
);

gulp.task('deps', function() {
    return gulp.src('app/**/*.html')
        .pipe(wiredep())
        .pipe(gulp.dest('dist'));
})

// gulp.task('default', gulp.series("clean", gulp.parallel("styles", "scripts")) )
gulp.task(
    'default',
    gulp.series(
        'clean',
        gulp.parallel( 'styles', 'scripts', 'deps' ),
        'server',
        function watcher(done) {
            gulp.watch(['app/scripts/**/*.js', '!app/scripts/vendor/**/*.js'], gulp.parallel('scripts'));
            gulp.watch('app/styles/**/*.less', gulp.parallel('styles'));
            gulp.watch('dist/**/*', bSync.reload);
            done();
        }
    )
)