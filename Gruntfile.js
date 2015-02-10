module.exports = function(grunt) {

	// mainfest variable will be used to generate
	// the left hand nav. Underscores will be stripped
	// to spaces. # Will be converted to section titles.

	var manifest = [
		'#Overview',
		'welcome',
		'starting_a_new_project',
		'navigation_and_layout',
		'unicode',

		'#Editing',
		'shape_editing',
		'canvas_tools',
		'keyboard_shortcuts',

		'#Panels',
		'character_chooser_panel',
		'layer_panel',
		'attributes_panel',
		'--character_panel',
		'--shape_panel',
		'--path_point_panel',
		'--linked_shape_instance_panel',
		'edit_history_panel',
		'guides_panel',

		'#Pages',
		'character_edit_page',
		'linked_shapes_page',
		'ligatures_page',
		'kerning_page',
		'test_drive_page',
		'font_settings_page',
		'project_settings_page',
		'import_svg_page',
		'export_font_page',
		'about_page'
	];


	// Generate the left hand navigation
	var nav = '';
	var man = '';
	for (var i = 0; i < manifest.length; i++) {
		man = manifest[i];

		if(man.charAt(0) === '#' && man.charAt(1) !== '#'){
			nav += '\t\t\t<h1>'+man.substr(1)+'</h1>\n';
		} else if (man.substr(0,2) === '##'){
			nav += '\t\t\t<h2>'+man.substr(2).replace(/_/gi, ' ')+'</h2>\n';
		} else if (man === 'welcome') {
			nav += '\t\t\t<a href="index.html">welcome</a>\n';
		} else {
			if(man.substr(0,2) === '--') {
				man = man.substr(2);
				nav += '\t\t\t<a style="margin-left:8px;" href="'+man+'.html">'+man.replace(/_/gi, ' ')+'</a>\n';
			} else {
				nav += '\t\t\t<a href="'+man+'.html">'+man.replace(/_/gi, ' ')+'</a>\n';
			}
		}
	}

	var bannerhtml = grunt.file.read('page_pieces/top.htm');
	bannerhtml = bannerhtml.replace(/{{nav}}/, nav);
	bannerhtml += '\n\n';
	var footerhtml = '\n\n';
	footerhtml += grunt.file.read('page_pieces/bottom.htm');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			build: {
				files: [{
					expand: true,		// Enable dynamic expansion.
					cwd: 'articles/',	// Src matches are relative to this path.
					src: ['*.htm'],		// Actual pattern(s) to match.
					dest: 'build/',		// Destination path prefix.
					ext: '.html'		// Dest filepaths will have this extension.
				}],
				options: {
					banner: bannerhtml,
					footer: footerhtml
				}
			}
		},
		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd: 'articles/img/',
						src: ['*.png'],
						dest: 'build/img/'
					},
					{
						src: 'page_pieces/glyphr-studio-help-style.css',
						dest: 'build/glyphr-studio-help-style.css'
					},
					{
						src: 'page_pieces/CNAME',
						dest: 'build/CNAME'
					}
				]
			},
			deploy: {
				expand: true,
				flatten: false,
				cwd: 'build/',
				src: '**',
				dest: 'gh-pages/'
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Tasks
	grunt.registerTask('default', ['concat', 'copy']);
};