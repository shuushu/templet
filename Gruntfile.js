module.exports = function(grunt) {

    'use strict';

    // 자동으로 grunt 태스크를 로드합니다. grunt.loadNpmTasks 를 생략한다.
    require('load-grunt-tasks')(grunt);

    // 작업시간 표시
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*--------------------------------------------------------------------------------- \n' +
        ' * Project   : <%= pkg.name %>(<%= pkg.description %>) v<%= pkg.version %>\n' +
        ' * User      : <%= pkg.make.user %>\n' +
        ' * Publisher : <%= pkg.make.publisher %>\n' +
        ' * Build     : <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * License   : <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
        ' ---------------------------------------------------------------------------------*/\n',

        clean: {
            dev: {
                files: [{
                    dot: true,
                    src: [
                        'dev/**/*',
                        'app/common/css',
                        'public/**/*'
                    ]
                }]
            },
            public: {
                files: [{
                    dot: true,
                    src: [
                        'app/common/css',
                        'public/**/*'
                    ]
                }]
            },
        },
       
// html task
        includes: {
            build: {
                cwd: 'app/docs/html/',
                src: ['**/*.html'],
                dest: 'public',
                options: {
                    flatten: true,
                    // debug: true,
                    includePath: 'app/docs/include/'
                }
            }
        },
        htmlhint: {
            options: {
                htmlhintrc: 'gruntConfig/.htmlhintrc'
            },
            public: [
                'app/docs/html/**/*.html',
                'app/docs/inclode/**/*.html'
            ]
        },

// css task
        less: {
            public: {
                options: {
                    banner: '<%= banner %>',
                    dumpLineNumbers : 'comments'
                },
                src: 'app/less/style.less',
                dest: 'app/common/css/style.css'
            },
        },

        csslint: {
            options: {
                csslintrc: 'gruntConfig/.csslintrc'
            },
            public: {
                src: '<%= less.public.dest %>'
            }
        },

        autoprefixer: {
             options: {
                browsers: [
                    'Android 2.3',
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24', // Firefox 24 is the latest ESR
                    'Explorer >= 8',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6'
                ]
            },
            public: { // app -> dest 이동
                expand: true,
                cwd: 'app/common/css/',
                src: ['*.css',],
                dest: 'public/common/css/'
            }
        },
        
        csscomb: {
            options: {
                config: 'gruntConfig/.csscomb.json'
            },
            files: {
                'public/common/css/style.css': ['app/common/css/style.css'],
            }
        },

        cssmin: {
            options: {
                // compatibility: 'ie8',
                keepSpecialComments: 1,
                // default - '!'가 붙은 주석은 보존,
                // 1 - '!'가 붙은 주석 중 첫번째 주석만 보존
                // 0 - 모든 주석 제거
                // noAdvanced: true,
            },
            public: {
                src: 'public/common/css/style.css',
                dest: 'public/common/css/style.min.css'
            }
        },
        
// javascript task
        jshint: {
            options: {
                jshintrc: 'gruntConfig/.jshintrc',
                force: true, // error 검출시 task를 fail 시키지 않고 계속 진단
                reporter: require('jshint-stylish') // output을 수정 할 수 있는 옵션
            },
            grunt: {
                src: ['Gruntfile.js']
            },
            public: {
                expand: true,
                cwd: 'app/common/js/site',
                src: ['*.js'],
                dest: 'app/common/js/site'
            }
        },

        concat: {
            public: {
                options: {
                    banner: '<%= banner %>'
                },
                src: 'app/common/js/site/*.js',
                dest: 'public/common/js/site/site.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            public: {
                src: '<%= concat.public.dest %>',
                dest: 'public/common/js/site.min.js'
            }
        },


// others task
        imagemin: {
            options: {
                title: 'Build complete',  // optional
                message: '<%= pkg.name %> build finished successfully.' //required
            },
            public: {
                files: [{
                    expand: true,
                    cwd: 'app/imgs/',
                    src: '**/*.{png,jpeg,jpg,gif}',
                    dest: 'public/imgs/'
                }]
            }
        },

        copy: {
            basic: {
                files: [ 
                    // fonts
                    {
                        expand: true,
                        cwd: 'app/common/fonts/',
                        src: '**',
                        dest: 'public/common/fonts/'
                    },
                    // js
                    {
                        expand: true,
                        cwd: 'app/common/js/lib',
                        src: ['*.js'],
                        dest: 'public/common/js/lib'
                    }
                ]
            },
            dev: { // 개발폴더를 위한 복사
                files: [
                    { // html folder
                        expand: true,
                        cwd: 'app/docs/html/',
                        src: '**',
                        dest: 'dev/'
                    },
                    { // include folder
                        expand: true,
                        cwd: 'app/docs/',
                        src: ['include/**/*'],
                        dest: 'dev/'
                    },
                    { // css
                        expand: true,
                        cwd: 'public/common/css/',
                        src: '**',
                        dest: 'dev/css/'
                    },
                    { // js
                        expand: true,
                        cwd: 'public/common/js/',
                        src: '**',
                        dest: 'dev/js/'
                    },
                    { // images
                        expand: true,
                        cwd: 'public/imgs/',
                        src: '**',
                        dest: 'dev/images/'
                    },
                    { // fonts
                        expand: true,
                        cwd: 'public/common/fonts/',
                        src: '**',
                        dest: 'dev/common/fonts/'
                    }
                ],
            }
        },

        // watch task
        watch: {
            options: {livereload: true},
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['newer:jshint:grunt']
            },
            js: {
                files: ['app/common/js/**/*.js'],
                tasks: ['newer:jshint:public','concat','uglify']
            },
            less: {
                files: ['app/less/**/*.less'],
                tasks: ['less','csslint','autoprefixer','csscomb','concat']
            },
            img: {
                files: ['app/imgs/**/*.{gif,jpeg,jpg,png}'],
                tasks: ['newer:imagemin']
            },
            html: {
                files: ['app/docs/**/*.html'],
                tasks: ['htmlhint','includes']
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    livereload: 35729,
                    // keepalive: true,
                    base: 'public',
                    open: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>/category1/page-01.html'
                }
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            public: [
                'html',
                'css',
                'js',
                'newer:imagemin'
            ]
        },

        
    });

    
    // server
    grunt.registerTask('serve', function (target) {
        if (target === 'public') {
            return grunt.task.run(['connect', 'watch']);
        }

        grunt.task.run([
            'default', 
            'connect', 
            'watch'
        ]);
    });

    // html task
    grunt.registerTask('html', [
            'htmlhint',
            'includes'
        ]
    );
    // css task
    grunt.registerTask('css', [
            'less',
            'csslint',
            'autoprefixer',
            'csscomb',
            'cssmin'
        ]
    );

    // javascript task
    grunt.registerTask('js', [
            'newer:jshint',
            'concat',
            'uglify'
        ]
    );
    

    grunt.registerTask('build', [
            'clean:dev',
            'concurrent',
            'copy'
        ]
    );

    grunt.registerTask('default', [
            'clean:public',
            'concurrent',
            'copy:basic'
        ]
    );

};
