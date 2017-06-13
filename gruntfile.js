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
                src: ['js/*.js'],
                dest: 'build',
                ext: '.js'
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            css: {
                src: ['build/css/*.css'],
                dest: 'build/css/all.css'
            }
        },

        watch: {
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass', 'csslint']
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
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'sass', 'uglify', 'copy']);
    grunt.registerTask('build', ['clean', 'sass', 'cssmin', 'uglify', 'copy', 'concat']);

}
