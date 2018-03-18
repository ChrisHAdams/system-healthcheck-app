const gulp = require("gulp");
const prettierPlugin = require("gulp-prettier-plugin");
const nodemon = require("nodemon");

gulp.task("prettier", () => {
  gulp
    .src(["root/**/*.js", "./gulpfile.js"])
    .pipe(prettierPlugin(null, { filter: true }))
    // passing a function that returns base will write the files in-place
    .pipe(gulp.dest(file => file.base));
});

gulp.task("nodemon", () => {
  nodemon({
    script: "index.js",
    ext: "js html",
    env: { NODE_ENV: "development" }
  });
});

gulp.task("default", ["nodemon"]);
