//Import dependencies
var fs = require('fs');

//Import helpers
var ParseSpecie = require('../helpers/parse-specie.js');

//Import config
var Config = require('../../gdbase-config.json');

//Get the full species list
exports.List = function()
{
	//Get the species list
	var list = fs.readdirSync(Config.species.path);

	//Output list
	var out = [];

	//Read all the species
	for(var i = 0; i < list.length; i++)
	{
		//Build
		var content = ParseSpecie(list[i]);

		//Concatenate the two lists
		out = out.concat(content);
	}

	//Return the full list
	return out;
};

//Find specie by ID
exports.ByID = function(id)
{
	//Get the species list
	var list = fs.readdirSync(Config.species.path);

	//Check if specie exists
	if(list.indexOf(id + '.json') === -1){ return []; }

	//Build
	return ParseSpecie(id + '.json');
};
