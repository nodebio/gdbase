//Import dependencies
var path = require('path');

//Import helpers
var ReplaceValue = require('./replace-value.js');

//Import config
var Config = require('../../gdbase-config.json');

//Function to get the source dir
exports.Dir = function(s, a, d)
{
	//Get the source folder
	var source = '{specie}_{assembly}_{dataset}/';

	//Replace the values
	source = ReplaceValues(source, { 'specie': s, 'assembly': a, 'dataset': d });

	//Concatenate the paths and return
	return path.join(Config.build.path, 'source/', source);
};

//Function to get the source file
exports.File = function(c, f)
{
	//Get the source file
	var source = 'chromosome_{chromosome}.txt';

	//Check for feature
	if(typeof f !== 'undefined'){ c = c + '_' + f; } 

	//Replace the values
	return ReplaceValues(source, { 'chromosome': c });
};
