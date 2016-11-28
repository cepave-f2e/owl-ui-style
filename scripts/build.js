const gu = require('gulp')
const compass = require('gulp-compass')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const size = require('gulp-size')
const del = require('del')
const fs = require('fs')
const pkg = require('../package.json')

del.sync(['dist', 'npm'])

gu.src('sass/owl-ui-lite.scss', {
  cwd: 'node_modules/owl-ui-lite/src'
})
  .pipe(compass({
    sass: 'node_modules/owl-ui-lite/src/sass',
    css: 'dist'
  }))
  .pipe(cleanCSS())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gu.dest('dist'))
  .on('finish', () => {
    gu.src('node_modules/owl-ui-lite/dist/assets/**/*.svg')
      .pipe(gu.dest('npm/assets'))

    gu.src('dist/*.css')
      .pipe(rename((f) => {
        f.basename = f.basename.replace('-lite', '-style')
      }))
      .pipe(gu.dest('npm/dist'))
      .on('finish', () => {
        delete pkg.scripts
        delete pkg.devDependencies
        fs.writeFile('npm/package.json', JSON.stringify(pkg, null, 2))
        gu.src('npm/**')
          .pipe(size({
            pretty: true,
            gzip: true,
            showFiles: true,
          }))
      })
  })
