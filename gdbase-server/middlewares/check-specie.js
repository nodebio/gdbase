//Import models
var Assembly = require('../models/assembly.js');

//Middleware for check the specie and the assembly
module.exports = function(req, res, next)
{
	//Initialize the response specie
	res.specie = { id: '', assembly: 'latest' };

	//Save the specie ID
	res.specie.id =  req.params.specie.toLowerCase();

	//Save the assembly
	res.specie.assembly = (typeof req.params.assembly !== 'undefined') ? req.params.assembly : 'latest';

	//Convert the assembly to lower case
	res.specie.assembly = res.specie.assembly.toLowerCase();

	//Check the assembly for this specie
	Assembly.Specie(res.specie.id, function(result){

		//Check for undefined
		if(typeof result === 'undefined'){ return res.json([]); }

		//Check for null
		if(!result){ return res.json([]); }

		//Check the length
		if(result.length == 0){ return res.json([]); }

		//Check for latest assembly
		if(res.specie.assembly === 'latest')
		{
			//Find the latest assembly
			for(var i = 0; i < result.length; i++)
			{
				//Check for latest
				if(result[i].latest === false){ continue; }

				//Update the latest
				res.specie.assembly = result[i].assembly;

				//Continue
				return next();
			}

			//If we exit
			return res.json([]);
		}

		//Check if assembly exists
		else
		{
			//Find the assembly
			for(var i = 0; i < result.length; i++)
			{
				//Check for latest
				if(result[i].assembly !== res.specie.assembly){ continue; }

				//Continue
				return next();
			}

			//If we exit
			return res.json([]);
		}

		//Default, show error
		return res.json([]);

	});
};
