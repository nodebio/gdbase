//Import dependencies
var fs = require('fs');
var lineByLine = require('n-readlines');
var mkdirp = require('mkdirp');
var path = require('path');

//Import helpers
var ParseSequence = require('../helpers/parse-sequence.js');
var Paths = require('../helpers/paths.js');

//Function to build the sequence database
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Get the source folder
	var folder_source = Paths.SourceFolder(opt.specie, opt.assembly, 'sequence');

	//Get the output folder
	var folder_output = Paths.OutputFolder(opt.specie, opt.assembly, 'sequence');

	//Create the output folder
	mkdirp.sync(folder_output, '0777');

	//Get the specie info
	var Specie = require('../../gdbase-specie/' + opt.specie + '.json');

	//Get the species source
	var SpecieSource = require('../source/' + opt.specie + '.json');

	//REad all the chromosomes
	for(var i = 0; i < Specie.chromosomes.length; i++)
	{
		//Get the chromosome
		var chr = Specie.chromosomes[i];

		//Show in console
		console.log('Building sequence for chromosome ' + chr);

		//Get the input file
		var file_source = path.join(folder_source, Paths.SourceFile(chr));

		//Get the output file
		var file_output = path.join(folder_output, Paths.OutputFile(chr));

		//Initialize the output file
		fs.writeFileSync(file_output, '', 'utf8');

		//Open the file
		var liner = new lineByLine(file_source);

		//Initialize the line
		var line = liner.next();

		//Counter
		var count = 0;

		//Sequence complete
		var sequence = '';

		//Start nucleotide
		var start = 1;

		//Read all the lines
		while(line = liner.next())
		{
			//Get the line
			line = line.toString('utf8');

			//Check for empty line
			if(line === '' || line === ' '){ continue; }

			//Convert the line to string and add to the sequence
			sequence = sequence + line;

			//Increment the counter
			count = count + 1;

			//Check for continue
			if(count < 4){ continue; }

			//Parse the line
			ParseSequence(file_output, chr, sequence, start);

			//Reset the start
			start = start + sequence.length;

			//Reset the counter
			count = 0;

			//Reset the sequence
			sequence = '';
		}
		//Check for empty line
		if(sequence === ''){ continue; }

		//Parse the last line
		ParseSequence(file_output, chr, sequence, start);
	}

	//Show confirmation in console
	console.log('Sequence Done!');
};
