module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src: [
          'banjir/vendor/js/bootstrap.min.js',
          'banjir/vendor/js/leaflet.js',
          'banjir/vendor/js/betterWMS.js',
          'banjir/vendor/js/leaflet-providers.js',
          'banjir/vendor/js/L.Control.MousePosition.js',
          'banjir/vendor/js/leaflet.markercluster.js',
          'banjir/vendor/js/spin.min.js',
          'banjir/vendor/js/leaflet.spin.js',
          'banjir/assets/js/reports.js',
          'banjir/assets/js/map.js'
        ],
        dest: 'build/js/application.js'
      },
      css: {
        src: ['banjir/vendor/css/*.css', 'banjir/assets/css/*.css'],
        dest: 'build/css/application.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/js/application.js',
        dest: 'build/js/application.min.js'
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        keepSpecialComments: false
      },
      build: {
        src: 'build/css/application.css',
        dest: 'build/css/application.min.css'
      }
    },
    staticHandlebars: {
      en: {
        files: { 'build/en/*.html': 'banjir/assets/templates/*.hbs' },
        options: { json: 'banjir/assets/translations/en.json' }
      },
      in: {
        files: { 'build/in/*.html': 'banjir/assets/templates/*.hbs'},
        options: { json: 'banjir/assets/translations/in.json' }
      }
    },
    copy: {
      images: {
        expand: true,
        flatten: true,
        files: [
          { expand: true, flatten: true, src: "banjir/assets/img/*", dest: "build/img/" },
          { expand: true, flatten: true, src: "banjir/vendor/css/images/*", dest: "build/css/images/" }
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-static-handlebars');

  // Tasks
  grunt.registerTask('assets', ['concat:js', 'uglify:build', 'concat:css', 'cssmin:build', 'copy:images']);
  grunt.registerTask('site', ['staticHandlebars:en', 'staticHandlebars:in']);
  grunt.registerTask('default', ['assets', 'site']);

};
