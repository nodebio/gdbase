//Import helpers
var Results = require('../helpers/results.js');

//Import models
var Species = require('../models/species.js');

//Middleware for check the specie and the assembly
module.exports = function(req, res, next)
{
	//Save the specie ID
	res.specie =  req.params.specie.toLowerCase();

	//Save the assembly
	res.assembly = (typeof req.params.assembly !== 'undefined') ? req.params.assembly : 'latest';

	//Convert the assembly to lower case
	res.assembly = res.assembly.toLowerCase();

	//Check the assembly for this specie
	var result = Species.ByID(res.specie);

	//Check the length
	if(result.length == 0){ return res.json(Results.Init('Unknow specie ' + res.specie)); }

	//Check for latest assembly
	if(res.assembly === 'latest')
	{
		//Find the latest assembly
		for(var i = 0; i < result.length; i++)
		{
			//Check for latest
			if(result[i].latest === false){ continue; }

			//Update the latest
			res.assembly = result[i].assembly;

			//Continue
			return next();
		}

		//If we exit
		return res.json(Results.Init('The database has not latest assembly'));
	}

	//Check if assembly exists
	else
	{
		//Find the assembly
		for(var i = 0; i < result.length; i++)
		{
			//Check for latest
			if(result[i].assembly !== res.assembly){ continue; }

			//Continue
			return next();
		}

		//If we exit
		return res.json(Results.Init('Unknow assembly ' + res.assembly));
	}

	//Default, show error
	return res.json(Results.Init('Unknow assembly ' + res.assembly));
};
