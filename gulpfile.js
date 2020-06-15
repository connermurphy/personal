const { dest, src, parallel } = require("gulp");
const gulpSass = require("gulp-sass");
const autoprefixCSS = require("gulp-autoprefixer");
const minifyJS = require("gulp-minify");
const minifyCSS = require("gulp-clean-css");
const gulpCleanCss = require("gulp-clean-css");

function sass() {
    return src("./src/sass/*.scss")
        .pipe(gulpSass())
        .pipe(autoprefixCSS())
        .pipe(gulpCleanCss())
        .pipe(dest("./assets/css/"));
}

function js() {
    return src("./src/js/*.js")
        .pipe(minifyJS())
        .pipe(dest("./assets/js"));
}

exports.default = parallel(sass, js);
