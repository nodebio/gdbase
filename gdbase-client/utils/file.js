//Import dependencies
var path = require('path');

//Import config
var Config = require('../../gdbase-config.json');

//Function for replace the specie and the assembly
function ReplaceSA(file, specie, assembly)
{
	//Replace the specie
	file = file.replace('{specie}', specie);

	//Replace the assembly
	file = file.replace('{assembly}', assembly);

	//Return the file
	return file;
}

//Get the biomart file
exports.Biomart = function(specie, assembly, type)
{
	//Get the file
	var file = Config.data.biomart;

	//Replace the assembly and the specie
	file = ReplaceSA(file, specie, assembly);

	//Replace the type
	file = file.replace('{type}', type);

	//Concatenate the paths and return
	return path.join(Config.data.path, file);
};

//Get the output file
exports.Output = function(specie, assembly)
{
	//Get the file
	var file = Config.data.output;

	//Replace the assembly and the specie
	file = ReplaceSA(file, specie, assembly);

	//Concatenate the paths and return
	return path.join(Config.data.path, file);
};
