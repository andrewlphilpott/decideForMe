module.exports = function(grunt) {
	//require('time-grunt')(grunt);

	// 1. All configuration goes here
	grunt.initConfig({
		config: {
			host: 'yoursite.dev',
			src: 'src',
			dest: 'public'
		},
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			dev: {
				dest: '<%= config.src %>/assets',
				js_dest: '<%= config.src %>/assets/js/lib',
				css_dest: '<%= config.src %>/assets/css'
			}
		},
		concat: {
			dist: {
				src: [
					'<%= config.src %>/assets/js/lib/*.js',
					'!**/*.min.js',
					'!<%= config.src %>/assets/js/lib/jquery.js',
					'!<%= config.src %>/assets/js/lib/modernizr.js',
					'!<%= config.src %>/assets/js/lib/respond.js',
					'!<%= config.src %>/assets/js/lib/selectivizr.js'
				],
				dest: '<%= config.src %>/assets/js/plugins.js',
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed',
					loadPath: require('node-bourbon').includePaths
				},
				files: {
					'<%= config.src %>/assets/css/screen.css': '<%= config.src %>/assets/scss/screen.scss',
					'<%= config.src %>/assets/css/print.css': '<%= config.src %>/assets/scss/print.scss',
				}
			}
		},
		uglify: {
			build: {
				files: [{
					expand: true,
					preserveComments: 'some',
					cwd: '<%= config.src %>/assets/js',
					src: [
						'*.js',
						'!**/*.min.js',
						'lib/jquery.js',
						'lib/modernizr.js',
						'lib/respond.js',
						'lib/selectivizr.js'
					],
					dest: '<%= config.src %>/assets/js',
					ext: '.min.js'
				}]
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/assets/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'src/assets/img/'
				}]
			}
		},
		copy: {
			main: {
				files: [
					/* This moves the assets to server */
					{
						cwd: '<%= config.src %>/',
						src: [
							'assets/**',
							'!assets/js/lib/**',
							'assets/js/lib/*.min.js'
						],
						dest: '<%= config.dest %>/',
						expand: true,
						filter: 'isFile'
					}
				]
			}
		},
		browser_sync: {
			dev: {
				options: {
					watchTask: true,
					debugInfo: true,
					open: false, // opens the site once initiated
					notify: true, // pushes a notification to the browers when it injects new CSS
					ghostMode: {
						clicks: true,
						links: true,
						forms: true,
						scroll: true
					},
					proxy: {
						host: '<%= config.host %>'
					}
				},
				bsFiles: {
					src : [
						'<%= config.dest %>/build/**/*.html',
						'<%= config.dest %>/assets/css/*.css',
						'<%= config.dest %>/assets/js/**/*.css'
					]
				}
			}
		},
		output_twig: {
			dev: {
				options: {
					docroot: '<%= config.src %>',
					tmpext: '.html',
					context: {
						assets: '/assets'
					}
				},
				files: [
					{
						expand: true,
						cwd: '<%= config.src %>',
						src: ['**/*.html','!layouts/*.html','!partials/*.html'],
						dest: '<%= config.dest %>/build',
						ext: '.html'
					}
				]
			}
		},
		watch: {
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['concat','sass','uglify','newer:copy','watch'],
			},
			files: {
				files: ['<%= config.src %>/assets/img/**/*.{png,gif,jpg,svg}'],
				tasks: ['newer:copy'],
				options: {
					spawn: false,
				},
			},
			templates: {
				options: {
					spawn: true,
					cwd: '<%= config.src %>'
				},
				files: ['**/*.html'],
				tasks: ['output_twig:dev']
			},
			scripts: {
				files: ['<%= config.src %>/assets/js/*.js','!<%= config.src %>/assets/js/*.min.js'],
				tasks: ['concat', 'uglify', 'newer:copy'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: [
					'<%= config.src %>/assets/scss/*.scss',
					'<%= config.src %>/assets/scss/pieces/*.scss',
					'<%= config.src %>/assets/scss/third_party/*.scss'],
				tasks: ['sass', 'newer:copy'],
				options: {
					spawn: false,
				}
			}
		}

	});

	// 3. Load Grunt Tasks
	require('load-grunt-tasks')(grunt, {
		pattern: ['*', '!load-grunt-tasks', '!node-bourbon']
	});

	// 4. Where we tell Grunt what to do when we type 'grunt' into the terminal.
	grunt.registerTask('default', [
		'concat',
		'sass',
		'imagemin',
		'uglify',
		'newer:copy',
		'output_twig',
		'browser_sync',
		'watch'
	]);

	grunt.registerTask('build', [
		'bower',
		'concat',
		'sass',
		'imagemin',
		'uglify',
		'copy',
		'output_twig'
	]);

	grunt.registerTask('minify', ['uglify']);
	grunt.registerTask('images', ['imagemin']);
	grunt.registerTask('make', ['output_twig']);
	grunt.registerTask('move', ['copy']);
};
