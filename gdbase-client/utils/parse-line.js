//Function for parse the value
function ParseValue(value, col, parse)
{
	//Check for strand
	if(col === 'strand')
	{
		//Return the strand value
		return (value === '-1') ? '-' : '+';
	}

	//Check for start, end or rank
	if(col === 'start' || col === 'end' || col === 'rank')
	{
		//Return the integer value
		return parseInt(value);
	}

	//Default, return the value
	return value;
}

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
		if(exclude.indexOf(col) > -1){ continue; }

		//Check for empty
		if(line[i] === '' || line[i] === ' '){ continue; }

		//Save the object
		obj[col] = ParseValue(line[i], col, parse);
	}

	//Return the new object
	return obj;
}

//Exports
module.exports = ParseLine;
