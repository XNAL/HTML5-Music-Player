module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: 'build'
        },

        sass: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: 'build/css',
                    ext: '.css'
                }],
                options: {
                    sourcemap: 'none'
                }
            }
        },

        csslint: {
            options: {
                csslintrc: ['.csslint']
            },
            build: ['build/*.css']
        },

        cssmin: {
            build: {
                expand: true,
                cwd: 'build/css',
                src: ['*.css', '!*.min.css'],
                dest: 'build/css',
                ext: '.css'
            }
        },

        uglify: {
            build: {
                expand: true,
                cwd: 'build/js',
                src: ['*.js'],
                dest: 'build/js',
                ext: '.js'
            }
        },

        copy: {
            html: {
                expand: true,
                cwd: 'html',
                src: '*',
                dest: 'build/html'
            },
            lib: {
                expand: true,
                cwd: 'lib/',
                src: '*',
                dest: 'build/lib'
            },
            image: {
                expand: true,
                cwd: 'images/',
                src: '*',
                dest: 'build/images'
            },
            music: {
                expand: true,
                cwd: 'music/',
                src: '*',
                dest: 'build/music'
            }
        },

        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            build: {
                files: [{
                    expand: true,
                    src: ['js/*.js'],
                    dest: 'build'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('default', ['clean', 'sass', 'babel', 'copy']);
    grunt.registerTask('build', ['clean', 'sass', 'cssmin', 'babel', 'uglify', 'copy']);

}
