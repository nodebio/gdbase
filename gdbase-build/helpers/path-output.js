//Import dependencies
var path = require('path');

//Import helpers
var ReplaceValue = require('./replace-value.js');

//Import config
var Config = require('../../gdbase-config.json');

//Function to get the output dir
exports.Dir = function(s, a, d)
{
	//Get the output folder
	var output = '{specie}_{assembly}_{dataset}/';

	//Replace the values
	output = ReplaceValues(output, { 'specie': s, 'assembly': a, 'dataset': d });

	//Concatenate the paths and return
	return path.join(Config.data.path, output);
};

//Function to get the output json file
exports.Json = function(c)
{
	//Get the source file
	var source = 'chromosome_{chromosome}.json';

	//Replace the values
	return ReplaceValues(source, { 'chromosome': c });
};

//Function to get the index file
exports.Index = function()
{
	//Return the index file
	return 'index.json';
};
