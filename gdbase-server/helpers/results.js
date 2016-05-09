//Import helpers
var Exclude = require('./exclude.js');

//Function to parse the results
exports.Parse = function(output)
{
	//Check the exclude options
	var exclude = output.request.exclude;

	//Read all the responses
	for(var i = 0; i < output.response.length; i++)
	{
		//Read all the results
		for(var j = 0; j < output.response[i].result.length; j++)
		{
			//Exclude the result
			output.response[i].result[j] = Exclude(output.response[i].result[j], exclude);
		}
	}

	//Return the parsed output
	return output;
};

//Function to initilize the results
exports.Init = function(error)
{
	//Create the new object
	return { error: error, request: {}, response: [] };
};
