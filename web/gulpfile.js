const gulp = require('gulp');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass');

gulp.task('devSass', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 9999,
            livereload: true,
            proxies: [{
                source: '/getProduct',
                target: 'http://localhost:3000/getProduct'
            }, {
                source: '/addProduct',
                target: 'http://localhost:3000/addProduct'
            }]
        }))
});
gulp.task('watching', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.series('devSass'));
});
gulp.task('default', gulp.series('devSass', 'server', 'watching'));