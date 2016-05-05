//Import dependencies
var path = require('path');

//Import config
var Config = require('../../gdbase-config.json');

//Function to replace the values
function ReplaceValues(file, values)
{
	//Read all the values
	for(var key in values)
	{
		//Replace the value
		file = file.replace('{' + key + '}', values[key]);
	}

	//Return the file
	return file;
}

//Get the Source folder
exports.Source = function(specie, assembly, dataset)
{
	//Get the source folder
	var source = Config.data.source;

	//Replace the values
	source = ReplaceValues(source, specie, assembly, dataset);

	//Concatenate the paths and return
	return path.join(Config.data.path, source);
};

//Get the source file
exports.SourceFile = function(service, dataset, rep)
{
	//Check the replace options
	if(typeof rep === 'undefined'){ var rep = {}; }

	//Get the source file for the selected service
	var file = Config.data.source_files[service][dataset];

	//Replace all
	for(var key in rep)
	{
		//Replace in the key
		var key2 = key.replace(/{/g, '').replace(/}/g, '');

		//Create the regex
		var regex = new RegExp('{' + key2 + '}', 'gi');

		//Replace
		file = file.replace(regex, rep[key]);
	}

	//Return the file
	return file;
};

//Get the output file
exports.Output = function(specie, assembly, dataset)
{
	//Get the file
	var file = Config.data.output;

	//Replace the values
	file = ReplaceValues(file, specie, assembly, dataset);

	//Concatenate the paths and return
	return path.join(Config.data.path, file);
};
