'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: {
          '.temp/main.css': 'Resources/Private/Assets/scss/main.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.temp/',
          src: '{,*/}*.css',
          dest: '.temp/'
        }]
      }
    },
    cssmin: {
      dist: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.min.css',
          'bower_components/fancybox/source/jquery.fancybox.css',
          '.temp/main.css'
        ],
        dest: 'Resources/Public/css/styles.min.css'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'Resources/Private/Assets/js/*.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          'Resources/Public/js/scripts.min.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/fancybox/source/jquery.fancybox.pack.js',
            'Resources/Private/Assets/js/main.js'
          ]
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'Resources/Private/Assets/images',
          src: '**/*.{gif,jpeg,jpg,png}',
          dest: 'Resources/Public/images'
        }]
      }
    },
    copy: {
      fancybox: {
        expand: true,
        src: ['bower_components/fancybox/source/*.{git|png}'],
        dest: 'Resources/Public/images/fancybox/'
      },
      icons: {
        expand: true,
        cwd: 'Resources/Private/Assets/icons',
        src: '**/*.{ico,svg,png,gif}',
        dest: 'Resources/Public/icons/'
      }
    },
    modernizr: {
      dist: {
        dest: 'Resources/Public/js/modernizr.min.js',
        uglify : true,
        files: {
          src: [
            'Resources/Public/js/**/*.js',
            'Resources/Public/css/**/*.css'
          ]
        }
      }
    },
    watch: {
      styles: {
        files: [
          'Resources/Private/Assets/scss/main.scss'
        ],
        tasks: ['styles']
      },
      scripts: {
        files: [
    	    'Resources/Private/Assets/js/main.js'
        ],
        tasks: ['scripts']
      }
    },
    clean: [
      '.temp',
      '.sass-cache'
    ]
  });

  grunt.registerTask('styles', ['sass', 'autoprefixer', 'cssmin:dist', 'clean']);
  grunt.registerTask('scripts', ['jshint', 'uglify:dist', 'clean']);
  grunt.registerTask('build', ['styles', 'scripts', 'modernizr', 'imagemin', 'copy']);
  grunt.registerTask('default', ['build', 'watch']);
};
