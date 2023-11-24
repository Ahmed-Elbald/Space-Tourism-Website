const paths = {

    minifyImg: {
        src: "./src/assets/images/**/*",
        dest: "./dist/assets/images",
    },

    html: {
        src: "./src/**/*.html",
        dest: "./dist",
    },

    css: {
        src: [
            "./src/scss/**/*.scss",
            "!./src/scss/vendor/**"
        ],
        dest: "./dist/css",
    },

    js: {
        src: "./src/js/**/*.js",
        dest: "./dist/js",
    },

    ts: {
        src: ["./src/ts/**/*.ts", "!./src/ts/ts/**"],
        dest: "./dist/js",
    },

    publicDir: [
        {
            dir: "./src/assets/fonts/",
            src: "./src/assets/fonts/",
            dest: "./dist/assets/fonts",
        },
        {
            dir: "./src/assets/data/",
            src: "./src/assets/data/",
            dest: "./dist/assets/data",
        }
    ],

    vendors: [
        {
            dir: "./node_modules/normalize.css",
            src: "./node_modules/normalize.css",
            dest: "./src/scss/vendor/normalize",
        },
        {
            dir: "./node_modules/bootstrap/",
            src: "./node_modules/bootstrap/",
            dest: "./src/scss/vendor/bootstrap",
        },
    ]

}
export default paths;