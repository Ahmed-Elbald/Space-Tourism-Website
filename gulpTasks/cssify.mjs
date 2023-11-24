// Imports
import gulp from "gulp";
import paths from "./paths.mjs"
import connect from "gulp-connect";
import gulpSass from "gulp-sass";
import * as dartSass from "sass"
import autoPrefixer from "gulp-autoprefixer";
import gulpPurgeCSS from "gulp-purgecss";

// Variables
const { src, dest } = gulp;
const sass = gulpSass(dartSass);

// Functions
export default function cssify() {

    return src(paths.css.src)
        .pipe(sass.sync({
            outputStyle: "expanded"
        })
            .on("error", sass.logError))
        // .pipe(gulpPurgeCSS({
        //     content: [`${paths.html.dest}/**/*.html`],
        // }))
        .pipe(autoPrefixer("last 3 versions"))
        .pipe(dest(paths.css.dest))
        .pipe(connect.reload());

}