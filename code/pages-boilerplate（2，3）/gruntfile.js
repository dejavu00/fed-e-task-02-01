const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass,
      },
      main: {
        files: {
          'dist/assets/styles/main.css': 'src/assets/styles/main.scss',
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env'],
      },
      main: {
        files: {
          'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
        }
      }
    },
    watch: {
      js: {
        files: ['src/assets/scripts/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/assets/styles/*.scss'],
        tasks: ['sass']
      }
    },
  })
  loadGruntTasks(grunt)

  grunt.registerTask('defaule', ['sass', 'babel', 'watch'])
}
