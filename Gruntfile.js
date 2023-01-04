module.exports = function(grunt) {

	// Manifest variable will be used to generate
	// the left hand nav. Underscores will be stripped
	// to spaces. # Will be converted to section titles.

	var manifest = [
		'#Overview',
		'welcome',
		'overview_updates',
		'overview_licensing',

		'#Basics',
		'overview_starting_a_new_project',
		'overview_navigation_and_layout',
		'overview_file_formats',
		'overview_unicode',

		'#Editing',
		'editing_shape_editing',
		'editing_canvas_tools',
		'editing_keyboard_shortcuts',

		'#Panels',
		'panel_chooser',
		'panel_shapes',
		'panel_attributes',
		'--panel_attributes_glyph',
		'--panel_attributes_shape',
		'--panel_attributes_path_point',
		'--panel_attributes_component_instance',
		'panel_edit_history',
		'panel_guides',

		'#Pages',
		'page_glyph_edit',
		'page_components',
		'page_ligatures',
		'page_kerning',
		'page_test_drive',
		'page_font_settings',
		'page_project_settings',
		'page_import_svg',
		'page_export_font',
		'page_about'
	];


	// Generate the left hand navigation
	var nav = '';
	var url = '';
	var man = '';
	for (var i = 0; i < manifest.length; i++) {
		url = manifest[i];
		man = url.replace(/page_/, '').replace(/panel_attributes_/, '').replace(/panel_/, '').replace(/editing_/, '').replace(/overview_/, '').replace(/_/gi, ' ');

		if(man.charAt(0) === '#' && man.charAt(1) !== '#'){
			nav += '\t\t\t<h1>'+man.substr(1)+'</h1>\n';
		} else if (man.substr(0,2) === '##'){
			nav += '\t\t\t<h2>'+man.substr(2).replace(/_/gi, ' ')+'</h2>\n';
		} else if (man === 'welcome') {
			nav += '\t\t\t<a href="index.html">welcome</a>\n';
		} else {

			if(man.substr(0,2) === '--') {
				man = man.substr(2);
				url = url.substr(2);
				nav += '\t\t\t<a style="margin-left:8px;" href="'+url+'.html">'+man+'</a>\n';
			} else {
				nav += '\t\t\t<a href="'+url+'.html">'+man+'</a>\n';
			}
		}
	}

	var bannerhtml = grunt.file.read('page_pieces/top.htm');
	bannerhtml = bannerhtml.replace(/{{nav}}/, nav);
	bannerhtml += '\n\n';
	var footerhtml = '\n\n';
	footerhtml += grunt.file.read('page_pieces/bottom.htm');
	footerhtml = footerhtml.replace(/<!--UPDATED-->/, 'Last updated ' + (new Date()).toDateString());
	footerhtml = footerhtml.replace(/<!--VERSION-->/, 'v1.*');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			build: {
				files: [{
					expand: true,		// Enable dynamic expansion.
					cwd: 'articles/',	// Src matches are relative to this path.
					src: ['*.htm'],		// Actual pattern(s) to match.
					dest: 'dist/',		// Destination path prefix.
					ext: '.html'		// Dest filepaths will have this extension.
				}],
				options: {
					banner: bannerhtml,
					footer: footerhtml
				}
			},
			updates: {
				files: [{
					src: 'articles/overview_updates.htm',
					dest: 'dist/overview_updates.html'
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
						dest: 'dist/img/'
					},
					{
						src: 'page_pieces/glyphr-studio-help-style.css',
						dest: 'dist/glyphr-studio-help-style.css'
					}
				]
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Tasks
	grunt.registerTask('default', 'concat:updates');
	grunt.registerTask('build', ['concat:build', 'copy']);
};