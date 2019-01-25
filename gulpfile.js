const gulp = require('gulp');
const uglifycss = require('gulp-uglifycss');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const terser = require('gulp-terser');

const sass= require('gulp-sass');
const autprefixer = require('gulp-autoprefixer');
const prettyError = require('gulp-prettyerror');

// Task to minify SASS
gulp.task('sass', function () {
  return gulp
    .src("./sass/*.scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(autprefixer({
      browsers: ["last 2 versions"]
    })
    )
    .pipe(gulp.dest('.build/css'))
    .pipe(uglifycss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./build/css"));
  });
// task to minify js
  gulp.task('js', function(){
    return gulp 
    .src("./js/*.js")
    .pipe(terser())
    .pipe(rename({ extname: ".min.js"}))
    .pipe(gulp.dest("./build/js"))
  });
// Task to watch for changes to CSS files
gulp.task("watch", function (done) {
  gulp.watch("sass/*.scss", gulp.series("sass"));
  gulp.watch("js/*.js", gulp.series("js"));
  done();
});

 
gulp.task('lin-js', () => {
    return gulp
    .src(['./js/*.js'])
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError());
});

// Load browsersync
gulp.task("browser-sync", function (done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp
    .watch(["build/css/*.css", "build/js/*.js"])
    .on('change', browserSync.reload);
  done();
});

// Default task
gulp.task('default', gulp.parallel('browser-sync', 'watch'));