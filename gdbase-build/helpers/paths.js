//Import dependencies
var path = require('path');

//Import helpers
var ReplaceValues = require('./replace-values.js');

//Import config
var Config = require('../../gdbase-config.json');

//Function to get the source folder
exports.SourceFolder = function(s, a, d)
{
	//Get the source folder
	var source = ReplaceValues('{specie}_{assembly}_{dataset}/', { 'specie': s, 'assembly': a, 'dataset': d });

	//Concatenate the paths and return
	return path.join(Config.data.path, 'source/', source);
};

//Function to get the source file
exports.SourceFile = function(c)
{
	//Return the temporal file
	return ReplaceValues('chromosome_{chr}.txt', { chr: c });
};

//Function to get the output folder
exports.OutputFolder = function(s, a, d)
{
	//Get the output folder
	var output = ReplaceValues('{specie}_{assembly}_{dataset}/', { 'specie': s, 'assembly': a, 'dataset': d });

	//Concatenate the paths and return
	return path.join(Config.data.path, output);
};

//Function to get the output file
exports.OutputFile = function(c)
{
	//Return the temporal file
	return ReplaceValues('chromosome_{chr}.json', { chr: c });
};

//Function to get the output index
exports.OutputIndex = function()
{
	//Return the output index file
	return 'index.json';
};
