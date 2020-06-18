// 实现这个项目的构建任务

const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del')
const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

const bs = browserSync.create()

const clean = () => {
  return del(['dist'])
}

const style = () => {
  return src('src/assets/styles/*.scss', {base: 'src'})
    .pipe(plugins.sass({outputStyle: 'expanded'}))
    .pipe(dest('dist'))
}

const script = ()=>{
  return src('src/assets/scripts/*.js', {base: 'src'})
    .pipe(plugins.babel({presets: ['@babel/preset-env']}))
    .pipe(dest('dist'))
}

const page = ()=>{
  return src('src/*.html', {base:'src'})
    .pipe(plugins.swig())
    .pipe(dest('dist'))
}

const image = () => {
  return src('src/assets/images/**', {base:'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', {base:'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', {base: 'public'})
    .pipe(dest('dist'))
}

const serve =  ()=>{
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**',
  ], bs.reload)

  bs.init({
    server: {
      notify: false,
      // port: 8000,
      // open: false,
      files: 'dist/**',
      baseDir: ['dist', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

const useref = ()=>{
  return src('dist/*.html', {base: 'dist'})
    .pipe(plugins.useref({searchPath: ['dist', '.']}))
    .pipe(dest('dist'))
}

const compile = parallel(style, script, page)

const build = series(clean, parallel(compile, image, font, extra))
// 开发任务，无需编译图片和样式
const dev = series(compile, serve)

module.exports = {
  clean,
  build,
  serve,
  dev,
  useref,
}

/*
  简答题：1、能够帮助开发者快速高效的开发项目；能够做到模板复用的能力；
  2、可以通过脚手架统一模板，在开发团队中使用同一个脚手架创建项目，保持一致的代码规范和格式，避免一个团队中开发规范不统一。
*/