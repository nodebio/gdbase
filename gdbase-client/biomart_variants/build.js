//Import dependencies
var fs = require('fs');
var lineByLine = require('n-readlines');
var path = require('path');

//Import querys
var queryVariants = require('./query/variants.json');

//Import utils
var ParseLine = require('../utils/parse-line.js');
var UtilsBiomart = require('../utils/biomart.js');
var UtilsData = require('../utils/data.js');

//Function to build from biomart source
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Get the source folder
	var folder = UtilsData.Source(opt.specie, opt.assembly, 'variants');

	//Get the output file
	var output = UtilsData.Output(opt.specie, opt.assembly, 'variants');

	//Initialize the output file
	fs.writeFileSync(output, '', 'utf8');

	//Get the specie info
	var Specie = require('../species/' + opt.specie + '.json');

	//REad all the chromosomes
	for(var i = 0; i < Specie.chromosomes.length; i++)
	{
		//Get the chromosome
		var chr = Specie.chromosomes[i];

		//Get the input file
		var input = path.join(folder, UtilsData.SourceFile('biomart', 'variants', { chromosome: chr }));

		//Open the file
		var liner = new lineByLine(input);

		//Initialize the line
		var line = '';

		//Read all the lines
		while(line = liner.next())
		{
			//Convert the line to string
			line = line.toString('utf8');

			//Parse the line
			line = ParseLine(line, queryVariants.attributes, []);

			//Convert the line to string
			line = JSON.stringify(line);

			//Save the line to the file
			fs.appendFileSync(output, line + '\n', 'utf8');
		}

	}

	//Show confirmation in console
	console.log('Output file saved on ' + output);
};
