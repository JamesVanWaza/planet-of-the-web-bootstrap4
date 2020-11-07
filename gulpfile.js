// var gulp = require('gulp'),
//     webserver = require('gulp-webserver');

// var builds = 'builds/bootstrap';

// gulp.task('js', function() {
//     return gulp.src(builds + '/js/myscript.js');
// });

// gulp.task('html', function() {
//     gulp.src(builds + '/**/*.html');
// });

// gulp.task('css', function() {
//     gulp.src(builds + '/css/*.css');
// });

// gulp.task('watch', function() {
//     gulp.watch(builds + '/js/**/*', ['js']);
//     gulp.watch(builds + '/css/**/*.css', ['css']);
//     gulp.watch([builds + '/**/*.html'], ['html']);
// });

// gulp.task('webserver', function() {
//     gulp.src(builds + '/')
//         .pipe(webserver({
//             port: 3000,
//             livereload: true,
//             livereloadport: 8283,
//             open: true
//         }));
// });

// gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);

const gulp = require("gulp"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create(),
    source = "./process/",
    dest = "./builds/bootstrap/";

sass.compiler = require("node-sass");

function html() {
    return gulp.src(dest + "**/*.html");
}

function js() {
    return gulp.src(dest + "**/*.js");
}

// function styles() {
//     return gulp.src(source + "sass/style.scss")
//         .pipe(sourcemaps.init()).pipe(sass({
//             sourcemap: true,
//             style: "compressed"
//         }).on("error", sass.logError)).pipe(gulp.dest(dest + "css"));
// }

function watch() {
    gulp.watch(dest + "js/**/*.js", js).on("change", browserSync.reload);
    // gulp.watch(source + "sass/**/*", styles).on("change", browserSync.reload);
    gulp.watch(dest + "index.html", html).on("change", browserSync.reload);
}

function server() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: dest
        }
    });

    // gulp.watch(source + "sass/**/*.scss", styles).on("change", browserSync.reload);
    gulp.watch(dest + "js/**/*.js", js).on("change", browserSync.reload);
    gulp.watch(dest + "index.html", html).on("change", browserSync.reload);
}

var build = gulp.series(gulp.parallel(js, html), server, watch);

gulp.task("default", build);