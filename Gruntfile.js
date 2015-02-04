module.exports = function(grunt) {

	// mainfest variable will be used to generate
	// the left hand nav. Underscores will be stripped
	// to spaces. # Will be converted to section titles.

	var manifest = [
		'#Overview',
		'starting_a_new_project',
		'navigation_and_layout',
		'character_editing_pages',
		
		'#Editing',
		'shape_editing',
		'canvas_tools',
		'keyboard_shortcuts',

		'#Panels',
		'character_panel',
		'shape_panel',
		'path_point_panel',
		'linked_shape_instance_panel',
		'edit_history_panel',
		'guides_panel',

		'#Pages',
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

		if(man.charAt(0) === '#'){
			nav += '\t\t\t<h1>'+man.substr(1)+'</h1>\n';
		} else {
			nav += '\t\t\t<a href="'+man+'.html">'+man.replace(/_/gi, ' ')+'</a>\n';
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
			options: {
				banner: bannerhtml,
				footer: footerhtml
			},
			build: {
				files: [{
					expand: true,		// Enable dynamic expansion.
					cwd: 'articles/',	// Src matches are relative to this path.
					src: ['*.htm'],		// Actual pattern(s) to match.
					dest: 'build/',		// Destination path prefix.
					ext: '.html',		// Dest filepaths will have this extension.
					extDot: 'first'		// Extensions in filenames begin after the first dot
				}]
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Tasks
	grunt.registerTask('default', ['concat']);
};