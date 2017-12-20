module.exports = function(grunt) {
    grunt.initConfig({
      jasmine : {
        // Your project's source files
        src : 'js/**/*.js',
        // Your Jasmine spec files
        options: {
          specs : 'spec/**/*Spec.js',
          helpers : 'spec/helpers/*.js'
        }
        
        // Your spec helper files
        
      }
    });
  
    // Register tasks.
    grunt.loadNpmTasks('grunt-contrib-jasmine');
  
    // Default task.
    grunt.registerTask('default', 'jasmine');
};