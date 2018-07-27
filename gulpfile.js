const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const csso = require('gulp-csso');
const jshint = require('gulp-jshint');
const uncss = require('gulp-uncss');
const htmlmin = require('gulp-htmlmin');
const server = require('gulp-server-livereload');





// SCRIPT TASKS
// UGLIFY JS COMPRESSION
gulp.task('scripts', function() {
  gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(uglify())
    .pipe(gulp.dest('minjs'))
});


// HTML TASKS
// COMPRESS HTML
gulp.task('minify', function() {
  return gulp.src('in/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./out'));
});


// STYLE TASKS
// REMOVES UNUSED CSS
gulp.task('nocss', function() {
  return gulp.src('in/*.css')
    .pipe(uncss({
      html: ['index.html', 'posts/**/*.html', 'http://example.com']
    }))
    .pipe(csso())
    .pipe(gulp.dest('./out'));
});


// SASS PREPROCESS
gulp.task('style', function() {
  gulp.src('*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('.css'))

});


// WATCH TASKS
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('js/*.js', ['scripts'])
  gulp.watch('*.scss', ['style'])
  gulp.watch('index.html')
});

// CLI TASKS
// LIVE SERVER / REDLOAD
gulp.task('webserver', function() {
  gulp.src('html')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true,
      defaultFile: 'index.html'
    }));
});




// DEFAULT TASK
// RUNS EVERYTHING
gulp.task('default', ['webserver','style', 'watch']);
