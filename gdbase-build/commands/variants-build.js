//Import dependencies
var fs = require('fs');
var lineByLine = require('n-readlines');
var path = require('path');

//Import helpers
var ParseLine = require('../helpers/parse-line.js');
var Paths = require('../helpers/paths.js');

//Import querys
var queryVariants = require('../query/variants.json');

//Function to build from biomart source
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Get the source folder
	var folder_source = Paths.SourceFolder(opt.specie, opt.assembly, 'variants');

	//Get the output folder
	var folder_output = Paths.OutputFolder(opt.specie, opt.assembly, 'variants');

	//Create the output folder
	mkdirp.sync(folder_output, '0777');

	//Get the specie info
	var Specie = require('../../gdbase-specie/' + opt.specie + '.json');

	//Get the species source
	var SpecieSource = require('../source/' + opt.specie + '.json');

	//Read all the chromosomes
	for(var i = 0; i < Specie.chromosomes.length; i++)
	{
		//Get the chromosome
		var chr = Specie.chromosomes[i];

		//Show in console
		console.log('Building variants for chromosome ' + chr);

		//Get the source file
		var file_source = path.join(folder_source, Paths.SourceFile(chr));

		//Get the output file
		var file_output = path.join(folder_output, Paths.OutputFile(chr));

		//Initialize the output file
		fs.writeFileSync(file_output, '', 'utf8');

		//Open the file
		var liner = new lineByLine(file_source);

		//Initialize the line
		var line = '';

		//Read all the lines
		while(line = liner.next())
		{
			//Convert the line to string
			line = line.toString('utf8');

			//Check for empty line
			if(line === '' || line === ' '){ continue; }

			//Split by tab
			line = line.split('\t');

			//Parse the line
			line = ParseLine(line, queryVariants.attributes, []);

			//Convert the line to string
			line = JSON.stringify(line);

			//Save the line to the file
			fs.appendFileSync(file_output, line + '\n', 'utf8');
		}
	}

	//Show confirmation in console
	console.log('Variants done!');
};
