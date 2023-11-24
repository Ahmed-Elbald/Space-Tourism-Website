// Imports
import gulp from "gulp";
import paths from "./paths.mjs"
import connect from "gulp-connect";
import gulpTs from "gulp-typescript";
import terser from "gulp-terser";

// Variables
const { src, dest } = gulp
const tsProject = gulpTs.createProject("tsconfig.json");


export default function jsify() {

    const tsResult = src(paths.ts.src)
        .pipe(tsProject())

    return tsResult.js.pipe(
        terser()
    )
        .pipe(dest(paths.ts.dest))
        .pipe(connect.reload())

}