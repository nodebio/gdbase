//Function for parse a file line
function ParseLine(line, cols, exclude)
{
	//Check the exclude
	if(typeof exclude === 'undefined'){ var exclude = []; }

	//Create the new object
	var obj = {};

	//Read all the cols
	for(var i = 0; i < cols.length; i++)
	{
		//Get the column name
		var col = cols[i].id;

		//Check for exclude
		if(exclude.indexOf(col) > 0){ continue; }

		//Check for empty
		if(line[i] === '' || line[i] === ' '){ continue; }

		//Save the object
		obj[col] = line[i];
	}

	//Return the new object
	return obj;
}

//Exports
module.exports = ParseLine;
