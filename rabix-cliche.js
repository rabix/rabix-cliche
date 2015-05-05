'use strict';

var fs = require('fs');
var path = require('path');
var colors = require('colors');
var jsonPath = process.argv[2];
var jobPath = process.argv[3];

var Cliche = require('./cliche');

var makeCMD = function (tool, job) {
    Cliche.setJob(job);
    Cliche.setTool(tool);
	Cliche.generateCommand().then(function (cmd) {
        console.log(cmd.bold.bgBlack.blue);
    }, function (er) {
        console.log(er.bold.bgBlack.red);
    });

    console.log(Cliche.getCommand());

};

if (typeof jsonPath !== 'undefined') {
	
	fs.readFile(path.normalize(jsonPath), function (err, tool) {

		if (err) {
			throw Error('**** Error reading tool json: ' + jsonPath);
		}
		
		if (typeof jobPath !== 'undefined') {
			
            fs.readFile(path.normalize(jobPath), function (err, job) {
                
                if (err) {
                    console.error('**** Error reading job json: ' + jobPath);
                    makeCMD(JSON.parse(tool.toString()), {});
                } else {
                    makeCMD(JSON.parse(tool.toString()), JSON.parse(job.toString()));
                }
                
			});
            
		} else {
			makeCMD(JSON.parse(tool.toString()), {});
		}
		
	});
	
} else {
	throw Error('**** Tool JSON must be specified, got: ' + jsonPath);
}
