//Complement object
var Comp = { 'N': 'N', 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' };

//Function to parse the sequence
module.exports = function(query, data)
{
	//Output sequence
	var seq = '';

	//Read the sequence blocks
	for(var i = 0; i < data.length; i++)
	{
		//Get the block
		var d = data[i];

		//Get the start point
		var start = (query.start <= d.start ) ? 0 : query.start - d.start;

		//Get the end point
		var end = d.sequence.length - ((d.end <= query.end) ? 0 : d.end - query.end);

		//Get the sequence
		seq = seq + d.sequence.slice(start, end);
	}

	//Check for negative strand
	if(query.strand === '-')
	{
		//Reverse and get the complement sequence
		seq = seq.split('').reverse().map(Complement).join('');
	}

	//Return the sequence
	return [ seq ];
};

//Function to return the complement base
function Complement(a){ return Comp[a]; }
