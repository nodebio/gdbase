//Import dependencies
var path = require('path');

//Import config
var Config = require('../../gdbase-config.json');

//Function to replace the values
function ReplaceValues(file, specie, assembly, dataset)
{
	//Replace the specie
	file = file.replace('{specie}', specie);

	//Replace the assembly
	file = file.replace('{assembly}', assembly);

	//Replace the dataset
	file = file.replace('{dataset}', dataset);

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
