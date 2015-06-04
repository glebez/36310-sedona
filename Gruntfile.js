module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      style: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      },

      build: {
        files: {
          'build/css/style.css': 'sass/style.scss'
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
      },

      build: {
        files: [{
          expand: true,
          src: [
            '*.html',
            'img/**',
            'js/**',
            'fonts/**',
            'bower_components/**'
          ],
          dest: 'build',
        }]
      }
    },

    clean: {
      gosha: [
        'gosha/img/README',
        'gosha/js/README'
      ],

      build: ['build']
    },

    autoprefixer: { 
      options: { 
        browsers: ["last 2 version", "ie 10"] 
      }, 

      build: { 
        src: "build/css/style.css" 
      }
    },

    cmq: {
      options: {
        log: false
      },
      build: {
        files: {
          'build/css/': ['build/css/*.css']
        }
      }
    },

    imagemin: { 
      images: { 
        options: { 
          optimizationLevel: 3 
        }, 
        files: [{ 
          expand: true, 
          src: ["build/img/**/*.{png,jpg,gif,svg}"] 
        }] 
      } 
    },

    watch: {
      style: {
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
  grunt.registerTask('build', ['clean:build', 'copy:build', 'sass:build', 'autoprefixer:build' , 'cmq:build', 'imagemin']);
};
