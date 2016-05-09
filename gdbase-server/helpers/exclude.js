//Function for exclude keys from the output
module.exports = function(results, exclude)
{
	//Check for empty
	if(exclude.length === 0){ return results; }

	//Read all the query results
	for(var i = 0; i < results.length; i++)
	{
		//Read all the exclude options
		for(var j = 0; j < exclude.length; j++)
		{
			//Check if the key exists
			if(typeof results[i][exclude[j]] === 'undefined'){ continue; }

			//Else, remove the key
			delete results[i][exclude[j]];
		}
	}

	//Return the filtered results
	return results;
};
