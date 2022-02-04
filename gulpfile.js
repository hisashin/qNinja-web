const gulp = require('gulp');

// Pug
const pug = require('gulp-pug');
const pugI18n = require('gulp-i18n-pug');

// TS
const typescript = require('gulp-typescript');
//const babel = require('gulp-babel');
// Sass
const sass = require('gulp-sass');
const exec = require('gulp-exec');

const doPug = (done) => {
  gulp.src(['${__dirname}/pug/**/*.pug', '${__dirname}/pug/**/*.jade', '!**/layout*', '!**/include/*', '!**/includes/*'])
  .pipe(pug({
    verbose: true,
    pretty: true
  }))
  .pipe(gulp.dest('${__dirname}/production/'));
  done();
};
const doPugI18n = (done) => {
  var options = {
    i18n: {
      verbose: true,
      dest: '${__dirname}/production/',
      locales: '${__dirname}/locales/*.*'
    },
    pretty: true
  };
  gulp.src(['${__dirname}/pugI18n/**/*.pug', '${__dirname}/pugI18n/**/*.jade', '!**/layout*', '!**/include/*', '!**/includes/*'])
  .pipe(pugI18n(options))
  .pipe(gulp.dest(options.i18n.dest));
  done();
};

const doSass = (done) => {
  gulp.src('${__dirname}/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('${__dirname}/production/'));
  done();
};

const doTs = (done) => {
  gulp.src([ '${__dirname}/ts/**/*.ts' ])
  .pipe(typescript({ target: 'ES5', module: 'commonjs' }))
  .js
  .pipe(gulp.dest('${__dirname}/production/'));
  done();
};

const doShell = (done) => {
  gulp.src('.')
  .pipe(exec("${__dirname}/build_local_console.sh",(err, stdout, stderr) => {
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr);
    }
  }));
  done();
};
/*
const doBabel = (done) => {
  gulp.src('${__dirname}/production/console/js-ES6/*.js')
    .pipe(babel())
    .pipe(gulp.dest('${__dirname}/production/console/js'))
  done();
};
*/
exports.default = gulp.parallel(doPug, doPugI18n);
