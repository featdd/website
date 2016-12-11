const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const flatten = require('gulp-flatten');
const imagemin = require('gulp-imagemin');
const modernizr = require('gulp-modernizr');
const autoprefixer = require('gulp-autoprefixer');
const closureCompiler = require('gulp-closure-compiler');

const pathAssetsPrivate = 'Resources/Private/Assets';
const pathAssetsPublic = 'Resources/Public';

gulp.task('sass', () => gulp
  .src(pathAssetsPrivate + '/**/*.scss')
  .pipe(sass())
  .pipe(rename('styles.css'))
  .pipe(gulp.dest('.temp/css'))
);

gulp.task('autoprefixer', ['sass'], () => gulp
  .src('.temp/css/styles.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(rename('styles.prefixed.css'))
  .pipe(gulp.dest('.temp/css'))
);

gulp.task('cssmin', ['autoprefixer'], () => gulp
  .src('.temp/css/styles.prefixed.css')
  .pipe(cssmin({keepSpecialComments: 0}))
  .pipe(rename('styles.min.css'))
  .pipe(gulp.dest(pathAssetsPublic + '/css'))
);

gulp.task('jshint', () => gulp
  .src(pathAssetsPrivate + '/js/**/*.js')
  .pipe(jshint('.jshintrc'))
);

gulp.task('jsconcat', ['jshint'], () => gulp
  .src([
    pathAssetsPrivate + '/vendor/jquery/dist/jquery.js',
    pathAssetsPrivate + '/vendor/fancybox/source/jquery.fancybox.pack.js',
    pathAssetsPrivate + '/js/main.js'
  ])
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('.temp/js'))
);

gulp.task('jscompile', ['jsconcat'], () => gulp
  .src('.temp/js/scripts.js')
  .pipe(closureCompiler({
    fileName: 'scripts.min.js',
    compilerFlags: {
      compilation_level: 'ADVANCED_OPTIMIZATIONS',
      output_wrapper: '(function(){%output%}).call(window);',
      warning_level: 'QUIET'
    }
  }))
  .pipe(uglify())
  .pipe(gulp.dest(pathAssetsPublic + '/js'))
);

gulp.task('modernizr', ['jscompile'], () => gulp
  .src([
    pathAssetsPublic + '/js/**/*.js',
    pathAssetsPublic + '/css/**/*.css'
  ])
  .pipe(modernizr())
  .pipe(uglify())
  .pipe(rename('modernizr.min.js'))
  .pipe(gulp.dest(pathAssetsPublic + '/js'))
);

gulp.task('clean', ['cssmin', 'jscompile'], () => del('.temp'));

gulp.task('imagemin', () => gulp
  .src([
    pathAssetsPrivate + '/images/*',
    pathAssetsPrivate + '/vendor/fancybox/source/**/*.{gif,jpeg,jpg,png,svg}'
  ])
  .pipe(imagemin())
  .pipe(flatten())
  .pipe(gulp.dest(pathAssetsPublic + '/images'))
);

gulp.task('icons', () => gulp
  .src(pathAssetsPrivate + '/icons/*')
  .pipe(gulp.dest(pathAssetsPublic + '/icons'))
);

gulp.task('fonts', () => gulp
  .src(pathAssetsPrivate + '/**/*.{eot,svg,ttf,woff,woff2}')
  .pipe(flatten())
  .pipe(gulp.dest(pathAssetsPublic + '/fonts'))
);

gulp.task('styles', ['sass', 'autoprefixer', 'cssmin']);
gulp.task('scripts', ['jshint', 'jsconcat', 'jscompile', 'modernizr']);
gulp.task('images', ['icons', 'imagemin']);
gulp.task('default', ['styles', 'scripts', 'images', 'fonts', 'clean']);
