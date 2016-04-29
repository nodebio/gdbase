//Function for parse the value
function ParseValue(value, col)
{
	//Check for strand
	if(col.id === 'strand'){ return (value === '-1') ? '-' : '+'; }

	//Check for string
	if(col.type === 'string'){ return value; }

	//Check for integer
	if(col.type === 'integer'){ return parseInt(value); }

	//Check for number
	if(col.type === 'number'){ return Number(value); }

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
		//Get the column
		var col = cols[i];

		//Check for empty
		if(line[i] === '' || line[i] === ' '){ continue; }

		//Check for exclude
		if(exclude.indexOf(col.id) > -1){ continue; }

		//Save the object
		obj[col.id] = ParseValue(line[i], col);
	}

	//Return the new object
	return obj;
}

//Exports
module.exports = ParseLine;
