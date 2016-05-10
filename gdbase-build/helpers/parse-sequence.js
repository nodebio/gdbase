//Import dependencies
var fs = require('fs');

//Function to parse the sequence
module.exports = function(output, chromosome, sequence, start)
{
	//Replace on the sequence
	sequence = sequence.replace(/ /g, '');

	//Create the new object
	var obj = {};

	//Save the chromosome
	obj.chromosome = chromosome;

	//Save the sequence
	obj.sequence = sequence;

	//Save the start point
	obj.start = start;

	//Save the end point
	obj.end = start + sequence.length - 1;

	//Save the line to the file
	fs.appendFileSync(output, JSON.stringify(obj) + '\n', 'utf8');
};
