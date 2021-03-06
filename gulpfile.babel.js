import gulp from "gulp";
import del from "del";
import gulp_sass from "gulp-sass";
import node_sass from "node-sass";
import minify from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";

const sass = gulp_sass(node_sass);

const routes = {
  css: {
    watch: "src/scss/*",
    src: "src/scss/*",
    dest: "dest/css",
  },
};

const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ flexbox: true, grid: "autoplace" }))
    .pipe(minify())
    .pipe(gulp.dest(routes.css.dest));

const watch = () => gulp.watch(routes.css.watch, styles);

const clean = () => del(["dest/css/*"]);

const prepare = gulp.series([clean]);

const assets = gulp.series([styles]);

const live = gulp.parallel([watch]);

export const dev = gulp.series([prepare, assets, live]);
