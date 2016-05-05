//Import dependencies
var path = require('path');

//Import helpers
var ReplaceValue = require('./replace-value.js');

//Import config
var Config = require('../../gdbase-config.json');

//Function to get the source dir
exports.SourceDir = function(s, a, d)
{
	//Get the source folder
	var source = '{specie}_{assembly}_{dataset}/';

	//Replace the values
	source = ReplaceValues(source, { 'specie': s, 'assembly': a, 'dataset': d });

	//Concatenate the paths and return
	return path.join(Config.build.path, 'source/', source);
};

//Function to get the source file
exports.SourceFile = function(c, f)
{
	//Get the source file
	var source = 'chr_{chromosome}.txt';

	//Check for feature
	if(typeof f !== 'undefined'){ c = c + '_' + f; }

	//Replace the values
	return ReplaceValues(source, { 'chromosome': c });
};

//Function to get the output dir
exports.OutputDir = function(s, a, d)
{
	//Get the output folder
	var output = '{specie}_{assembly}_{dataset}/';

	//Replace the values
	output = ReplaceValues(output, { 'specie': s, 'assembly': a, 'dataset': d });

	//Concatenate the paths and return
	return path.join(Config.data.path, output);
};

//Function to get the output json file
exports.OutputJson = function(c)
{
	//Get the source file
	var source = 'chr_{chromosome}.json';

	//Replace the values
	return ReplaceValues(source, { 'chromosome': c });
};

//Function to get the index file
exports.OutputIndex = function()
{
	//Return the index file
	return 'index.json';
};
