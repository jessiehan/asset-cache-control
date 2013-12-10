/*
 * grunt-cache
 * https://github.com/hpp/cache
 *
 * Copyright (c) 2013 hpp
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	var crypto = require('crypto');


	function getNewAssetsUrl(assetName, md5) {
		md5=md5.substring(0,8);
		var newurl='';
		//already has ts, just update md5
		if(assetName.indexOf('?t=')>=0){
			newurl = assetName.substring(0,assetName.length-8) + md5;
			
		}else{
			
			newurl = assetName + '?t=' + md5;
		}

		return newurl;



	}

	function replaceAssets(fileSrc, assetUrl) {
		if (grunt.file.exists(fileSrc)) {
			//read page file data
			var data = grunt.file.read(fileSrc);
			//read asset file data
			var assetData=grunt.file.read(assetUrl);
			//remove the directory
			assetUrl=assetUrl.substring(assetUrl.lastIndexOf('/'),assetUrl.length);
			
			//if the page file has the asset
			if (data.indexOf(assetUrl) >= 0) {
				
				var md5sum = crypto.createHash('md5');
				md5sum.update(assetData, 'utf-8');
				
				//get the full asset text, like "text/javascript" src="js/hello.js?t=cefe2283"
				var reg=new RegExp('".*'+assetUrl+'.*"','g');
				var fullAssetUrl=reg.exec(data).toString();
				
				//only leave hello.js?t=cefe2283
				var assetName=fullAssetUrl.substring(fullAssetUrl.indexOf(assetUrl),fullAssetUrl.length-1);
				
				var newurl = getNewAssetsUrl(assetName, md5sum.digest('hex'));
				var newdata = data.replace(assetName, newurl);

				if (grunt.file.write(fileSrc, newdata)) {
					grunt.log.success(fileSrc + ' add ts successfully');
				} else {
					grunt.log.error(fileSrc + ' add ts failed');
				}





			} else {
				grunt.log.error('asset not found in file ' + fileSrc);


			}



		}




	}


	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('cache', 'The best Grunt plugin ever.', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({

		});
		var assetUrl = this.data.assetUrl;

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.

			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					grunt.log.success('Source file "' + filepath + '" found.');
					replaceAssets(filepath, assetUrl);


					return true;
				}
			});

		});
	});

};
