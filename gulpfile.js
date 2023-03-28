const { src, dest, task, series, watch, parallel } = require("gulp");
const clean = require("gulp-clean"); //подключение очищения папки
const rm = require("gulp-rm");
const browserSync = require("browser-sync").create(); // подключение запуска сервера
const reload = browserSync.reload; // для автоматической перезагрузки страницы
// const gcmq = require('gulp-group-css-media-queries');// подключение media кампилятора (ломает шрифты)
const cleanCSS = require("gulp-clean-css"); // минификация css
const sourcemaps = require("gulp-sourcemaps"); // добавление меток
const concat = require("gulp-concat"); // соединение в один файл
const babel = require("gulp-babel"); // галп для преобразования js под более старые версии
const uglify = require("gulp-uglify"); // минификатор js
const svgo = require("gulp-svgo"); // минимизация SVG-файлов
const sassGlob = require("gulp-sass-glob");
const sass = require("gulp-sass")(require("node-sass"));
// const svgSprite = require('gulp-svg-sprite');// собирает svg в sprite (у меня все и так в спрайте)

const {SRC_PATH, DIST_PATH} = require('./gulp.config');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;


task("clean", () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task("copy:html", () => {
  //копирует файл index.html и вставляет его в папку dist
  return src(`${SRC_PATH}/index.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task("styles", () => {
  return (
    src(`${SRC_PATH}/styles/stile.scss`)
      .pipe(gulpif(env === 'dev', sourcemaps.init()))
      .pipe(concat("main.min.scss"))
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(gulpif(env === 'prod', cleanCSS()))
      .pipe(gulpif(env === 'dev', sourcemaps.write()))
      .pipe(dest(DIST_PATH))
      .pipe(reload({ stream: true }))
  );
});

task("scripts", () => {
  return src([`${SRC_PATH}/scripts/*.js`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat("main.min.js")) // соединяет в 1 файл.js
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task("icons", () => {
  return src(`${SRC_PATH}/images/icons/*.svg`).pipe(dest(`${DIST_PATH}/images/icons`));
});

task("pic", () => {
  return src(`${SRC_PATH}/images/png/*`).pipe(dest(`${DIST_PATH}/images/png`));
});

task("server", () => {
  // запуск сервера
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    open: false,
  });
});

task("watch", () => {
  watch("index.html", series("copy:html")); // следит за изменениями в index.html, и запускает copy:html
  watch(`${SRC_PATH}/styles/**/*.scss`, series("styles")); // следит за изменениями в main.css, и запускает styles
  watch(`${SRC_PATH}/scripts/*.js`, series("scripts")); // следит за изменениями в jsFiles, и запускает scripts
  watch(`${SRC_PATH}/images/icons/icons/*.svg`, series("icons"));
  watch(`${SRC_PATH}/images/icons/png/*.png`, series("pic"));
});

task(
  "default",
  series("clean",
    parallel("copy:html", "styles", "scripts", "icons", "pic"),
    parallel("watch", "server")
  )
);
