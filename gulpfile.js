const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const del = require("del");

const pluginFile = {
  srcFile: "DOMElementRelocation.js",
  srcPath: "./src/",
  dest: "./dist"
};


/**
 * Clean dist dir.
 */
function cleanTask() {
  return del(['dist']);
}


/**
 * Converts ES6 code into compatible browser code.
 */
function babelizeTask() {
  let src = pluginFile.srcPath + pluginFile.srcFile;

  return browserify({entries: [src]})
    .transform(babelify)
    .bundle()
    .pipe(source(pluginFile.srcFile))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(pluginFile.dest));

}


/**
 * Watcher.
 */
function watchTask() {
  gulp.watch(['src/**/*'], buildTask);
}

/**
 * Build task.
 */
let buildTask = gulp.series(
  cleanTask,
  babelizeTask,
);

// Define tasks.
exports.build = buildTask;
exports.watch = watchTask;
