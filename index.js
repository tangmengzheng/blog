// load all route controllers
'use strict';

// imports
var fs = require('fs');
var path = require('path');

// exports 
module.exports = function(app) {
	var routeDir = './routes';
	var indexFile = path.basename(__filename);
	console.log('routes: dir', routeDir, '; index', indexFile);

	fs.readdirSync(routeDir).forEach(function(file) {
		var extName = path.extname(file);
		if(extName != '.js') {
			return;
		}
		if(file == indexFile) {
			return;
		}
		if(file.charAt(0) < 'A' || file.charAt(0) > 'z') {
			return;
		}
		console.log('routes: require', file);
		require('./' + file)(app);
	});

	console.log('routes: exit', routeDir);
};

