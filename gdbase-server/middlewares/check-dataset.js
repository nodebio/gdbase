//Import helpers
var Results = require('../helpers/results.js');

//Function to capitalize string
function Capitalize(s)
{
	//Capitalize the string
	return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
}

//Middleware to check the dataset
module.exports = function(req, res, next)
{
	//Save the dataset
	res.dataset = req.params.dataset.toLowerCase();

	//Save the findby
	res.findby = req.params.findby.toLowerCase();

	//Import specie
	var specie = require('../../gdbase-species/' + res.specie + '.json');

	//Get the dataset info
	var di = specie.data[res.dataset];

	//Check the type
	if(di[res.findby] === false)
	{
		//Prepare the error
		var e = Capitalize(res.dataset) + ' dataset only admits finding by ';

		//Available finds
		var finds = [];

		//Read all
		for(var key in di)
		{
			//Check for false
			if(di[key] === false){ continue; }

			//Insert
			finds.push(key);
		}

		//Show error
		return res.json(Results.Init(e + finds.join(', ')));
	}

	//Continue
	return next();
};
