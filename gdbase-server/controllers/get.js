//Import dependencies
var express = require('express');

//Import helpers
var Coordinate = require('../helpers/coordinate.js');
var Results = require('../helpers/results.js');
var Sequence = require('../helpers/sequence.js');

//Import middlewares
var CheckDataset = require('../middlewares/check-dataset.js');
var CheckSpecie = require('../middlewares/check-specie.js');
var SetHeaders = require('../middlewares/set-headers.js');

//Import models
var Dataset = require('../models/dataset.js');

//Create the new router
var router = express.Router();

//Template url
var url = '/:specie/:assembly/:dataset/:findby/:query';

//Find By ID
router.get(url, SetHeaders.JSON, CheckSpecie, CheckDataset, function(req, res, next){

	//Get the query
	var query = req.params.query;

	//Split the query by comma
	query = query.split(',');

	//Generate the output
	var output = Results.Init(null);

	//Save the specie
	output.request.specie = res.specie;

	//Save the assembly
	output.request.assembly = res.assembly;

	//Save the dataset
	output.request.dataset = res.dataset;

	//Save the find by
	output.request.findby = res.findby;

	//Save the exclude options
	output.request.exclude = (typeof req.query.exclude !== 'undefined') ? req.query.exclude.split(',') : [];

	//Read all the query
	for(var i = 0; i < query.length; i++)
	{
		//Save the query
		output.response.push({ query: query[i], error: null, result: [] });
	}

	//Get the data
	GetData(res, output, 0, function(results){

		//Parse the results
		output = Results.Parse(output);

		//Return the results
		return res.json(output);

	});

});

//Recursive function to get the data info
function GetData(res, output, index, callback)
{
	//Check the index
	if(output.response.length <= index)
	{
		//Exit
		return callback(output);
	}

	//Get the query
	var query = output.response[index].query;

	//Check for find region
	if(output.request.findby === 'region')
	{
		//Parse the query
		query = Coordinate(query);

		//Check for error
		if(typeof query.error !== 'undefined')
		{
			//Save the rror
			output.response[index].error = query.error;

			//Continue
			return GetData(res, output, index + 1, callback);
		}
	}

	//Get the data
	Dataset[res.findby](query, res.specie, res.assembly, res.dataset, function(data){

		//Check for sequence dataset
		if(res.dataset === 'sequence'){ data = Sequence(query, data); }

		//Save the data
		output.response[index].result = data;

		//Continue
		return GetData(res, output, index + 1, callback);

	});
}

//Exports to node
module.exports = router;
