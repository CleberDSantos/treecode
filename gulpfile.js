"use strict";

var gulp = require("gulp");
var gnf = require("gulp-npm-files");
var npm = require("gulp-install");

var paths = {
  appSource: "./src/app/",
  sassSource: "./src/app/components/",
  typingsSource: "./src/typings/",
  assetsSource: "./src/assets/css/"
};

gulp.task("npm", () => {

  gulp.src(["./package.json"]).pipe(npm({
    args: ["--only=dev"]
  }));
  gulp.src(["./package.json"]).pipe(npm());
});

gulp.task("uglify", () => {
  // var uglify = require("gulp-uglify");
});

gulp.task("sass", () => {

  var sass = require("gulp-sass");

  gulp.src(paths.sassSource + "**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.sassSource));

  gulp.src(paths.sassSource + "scss/*.css")
    .pipe(gulp.dest(paths.assetsSource));

});

gulp.task("default", ["sass", "npm"]);

//This task should only be executed for compilation on the server.
gulp.task("cleanup", ["clean:typings", "default"]);
