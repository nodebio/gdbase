//Import dependencies
var fs = require('fs');
var lineByLine = require('n-readlines');
var path = require('path');

//Import helpers
var FindColumn = require('../helpers/find-column.js');
var Paths = require('../helpers/paths.js');

//Import querys
var queryVariants = require('../query/variants.json');

//Function to sort the variants files
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Check the sort by
	if(typeof opt.sortBy === 'undefined'){ return console.log('No column to sort provided...'); }

	//Get the source folder
	var folder = Paths.SourceFolder(opt.specie, opt.assembly, 'variants');

	//Get the specie info
	var Specie = require('../../gdbase-specie/' + opt.specie + '.json');

	//Get the species source
	var SpecieSource = require('../source/' + opt.specie + '.json');

	//Get the index for sorting
	var index = FindColumn(queryVariants.attributes, 'id', opt.sortBy);

	//Check for undefined index
	if(index === -1){ return console.log('Undefined column ' + opt.sortBy ); }

	//REad all the chromosomes
	for(var i = 0; i < Specie.chromosomes.length; i++)
	{
		//Get the chromosome
		var chr = Specie.chromosomes[i];

		//Show in console
		console.log('Sorting variants for chromosome ' + chr);

		//Get the input file
		var input = path.join(folder, Paths.SourceFile(chr));

		//Open the file
		var liner = new lineByLine(input);

		//Initialize the line
		var line = '';

		//Initialize the variants array
		var variants = [];

		//Read all the lines
		while(line = liner.next())
		{
			//Get the line
			line = line.toString('utf8').split('\t');

			//Check for integer
			if(queryVariants.attributes[index].type === 'integer'){ line[index] = parseInt(line[index]); }

			//Check for number
			else if(queryVariants.attributes[index].type === 'number'){ line[index] = Number(line[index]); }

			//Insert
			variants.push(line);
		}

		//Sort
		variants.sort(function(a, b){ return a[index] - b[index]; });

		//Save the variants list
		fs.writeFileSync(input, '', 'utf8');

		//Read the variants list
		for(var j = 0; j < variants.length; j++)
		{
			//Get the line
			line = variants[j].join('\t');

			//Save
			fs.appendFileSync(input, line + '\n', 'utf8');
		}
	}

};
