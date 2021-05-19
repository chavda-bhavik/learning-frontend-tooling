var gulp = require('gulp');

gulp.task('test', function(done) {
    console.log('Hello World!');
    done()
});

gulp.task('copy', function(done) {
    return gulp.src('app/scripts/**/*.js').pipe(gulp.dest('dist'));
    // done();
})