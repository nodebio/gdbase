//Function to parse coordinates
module.exports = function(str)
{
	//Output coordinates
	var out = { };

	//Split by :
	str = str.split(':');

	//Check the length
	if(str.length < 2){ return { error: 'Invalid region' }; }

	//Save the chromosome
	out.chromosome = str[0];

	//Get the region
	var region = str[1];

	//Check for empty region
	if(region === '' || region === ' '){ return { error: 'Invalid region' }; }

	//Split the region
	region = region.split('-');

	//Check the region length
	if(region.length !== 1 && region.length !== 2){ return { error: 'Invalid region' }; }

	//Save the start
	out.start = parseInt(region[0]);

	//Check the end
	out.end = (region.length === 1) ? out.start : parseInt(region[1]);

	//Check the start or the end
	if(isNaN(out.start) || isNaN(out.end)){ return { error: 'Invalid region' }; }

	//Check the strand
	if(str.length === 3)
	{
		//Set the strand
		out.strand = (str[2] === '-1' || str[2] === '-') ? '-' : '+';
	}
	else
	{
		//Default strand
		out.strand = '+';
	}

	//Check the start and end positions
	if(out.end < out.start)
	{
		//Auxiliar position
		var aux = out.end + 0;

		//Replace the end
		out.end = out.start + 0;

		//Replace the start
		out.start = aux + 0;

		//Update the strand
		out.strand = (out.strand === '+') ? '-' : '+';
	}

	//Return the region
	return out;
};
