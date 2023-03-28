const { src, dest, task, series, watch, parallel } = require('gulp');
const clean = require('gulp-clean');                                             //подключение очищения папки
const browserSync = require('browser-sync').create();                            // подключение запуска сервера
const reload = browserSync.reload;                                               // для автоматической перезагрузки страницы
// const gcmq = require('gulp-group-css-media-queries');                         // подключение media кампилятора (ломает шрифты)
const cleanCSS = require('gulp-clean-css');                                      // минификация css
const sourcemaps = require('gulp-sourcemaps');                                   // добавление меток 
const concat = require('gulp-concat');                                           // соединение в один файл
const babel = require('gulp-babel');                                             // галп для преобразования js под более старые версии
const uglify = require('gulp-uglify');                                           // минификатор js 
const rename = require("gulp-rename");                                           // галп для переименования файла
const svgo = require('gulp-svgo');                                               // минимизация SVG-файлов
// const svgSprite = require('gulp-svg-sprite');                                    // собирает svg в sprite (у меня все и так в спрайте)


task('clean', () => {                                                      // очищает папку dist
  return src('dist/**/*', { read: false }).pipe(clean());
});

task('copy:html', () => {                                                       //копирует файл index.html и вставляет его в папку dist
  return src('index.html')
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
});


task('styles', () => {
  return src('main.css')
    //.pipe(sourcemaps.init())                                                     // создадим метки
    // .pipe(gcmq())                                                            //media кампилятор (ломает шрифты)
    .pipe(cleanCSS())                                                           // минификаатор
    //.pipe(sourcemaps.write())                                                    // вставим метки
    .pipe(dest('dist'));                                                        //копирует файл main.css и вставляет его в папку dist
});


const jsFiles = [                                                                  // массив без js для видео, ибо он ломается
  'src/scripts/jQuery.js',
  'src/scripts/*.js',
  '!src/scripts/player.js'
]

task('player', () => {                                                           //что бы скопировать js для видео
  return src('src/scripts/player.js')
    //.pipe(sourcemaps.init())                                                      // создадим метки
    .pipe(babel({ presets: ['@babel/env'] }))                                         // преобр js d более ст v
    // .pipe(uglify())                                                                 // минификаатор
    // .pipe(rename('player.min.js'))                                                  // переименовала
    //.pipe(sourcemaps.write())                                                     // вставим метки 
    .pipe(dest('dist'));
});

task('scripts', () => {
  return src(jsFiles)
    .pipe(sourcemaps.init())                                                      // создадим метки
    .pipe(concat('main.js'))                                                        // соединяет в 1 файл.js
    // .pipe(babel({ presets: ['@babel/env'] }))                                         // преобр js d более ст v
    .pipe(uglify())                                                                 // минификаатор
    .pipe(sourcemaps.write())                                                     // вставим метки 
    .pipe(dest('dist'));
});

task('icons', () => {
  return src('src/images/**/*.svg')
    .pipe(dest('dist/images'));
});

task('pic', () => {
  return src('src/images/**/*')
    .pipe(dest('dist/images'));
});

task('server', () => {                                                           // запуск сервера
  browserSync.init({
    server: {
      baseDir: "dist"
    },
    open: false
  });
});


// watch('index.html', series('copy:html'));                                       // следит за изменениями в index.html, и запускает copy:html
// watch('main.css', series('styles'));                                            // следит за изменениями в main.css, и запускает styles
// watch('jsFiles', series('scripts'));                                            // следит за изменениями в jsFiles, и запускает scripts
// watch('src/scripts/player.js', series('player'));

task('default', series('clean', parallel('copy:html', 'styles', 'player', 'scripts', 'icons', 'pic'), 'server'));         // запускает необходимые ф-ции в нужном порядке по команде "npm run gulp"