//Import dependencies
var fs = require('fs');
var path = require('path');

//Import config
var Config = require('../../gdbase-config.json');

//Function to parse the species file
module.exports = function(file)
{
	//Create the list
	var list = [];

	//Create the full path
	file = path.join(Config.species.path, file);

	//Import the file
	file = JSON.parse(fs.readFileSync(file, 'utf8'));

	//Read all the assemblies
	for(var j = 0; j < file.assembly.length; j++)
	{
		//Create the new object
		var obj = {};

		//Add the specie
		obj.specie = file.id;

		//Add the assembly
		obj.assembly = file.assembly[j].id;

		//Add the latest
		obj.latest = file.assembly[j].latest;

		//Add the specie name
		obj.name = file.name + ' ' + file.assembly[j].name;

		//Save
		list.push(obj);
	}

	//Return the list
	return list;
};
