module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-lintspaces');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      style: {
        files: {
          'css/style.css': 'less/style.less'
        }
      }
    },

    sass: {
      style: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    },

    lintspaces: {
      test: {
        src: [
          '*.html',
          'js/*.js',
          'less/*.less',
          'sass/*.sass'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },

    githooks: {
      test: {
        'pre-commit': 'lintspaces:test',
      }
    },

    copy: {
      gosha: {
        files: [{
          expand: true,
          src: [
            '*.html',
            'css/**',
            'img/**',
            'js/**'
          ],
          dest: 'gosha',
        }]
      }
    },

    clean: {
      gosha: [
        'gosha/img/README',
        'gosha/js/README'
      ]
    },

    watch: {
      styles: {
          files: ['sass/*.scss', 'sass/**/*.scss'],
          tasks: ['sass:style'],
          options: {
            spawn: false
          }
      }
    }
  });

  grunt.registerTask('test', ['lintspaces:test']);

  grunt.registerTask('default', ['sass:style', 'copy:gosha', 'clean:gosha']);
  grunt.registerTask('watch', ['watch:styles']);
};
