
var gulp = require("gulp");
var sass = require("gulp-sass");
gulp.task("less", function() {
gulp.src("less/style.less")
.pipe(less())
.pipe(gulp.dest("css"));
});
gulp.task("sass", function() {
gulp.src("sass/style.scss")
.pipe(sass())
.pipe(gulp.dest("src"));
})

/*
.pipe(gulp.dest("css"));*/
