//Import dependencies
var execSync = require('child_process').execSync;
var mkdirp = require('mkdirp');
var path = require('path');

//Import helpers
var Command = require('../helpers/command.js');
var Paths = require('../helpers/data.js');
var Xml = require('../helpers/xml.js');

//Import querys
var queryVariants = require('../query/variants.json');

//Function to import from biomart
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Get the specie info
	var Specie = require('../../gdbase-specie/' + opt.specie + '.json');

	//Get the species source
	var SpecieSource = require('../source/' + opt.specie + '.json');

	//Get the source folder
	var folder = Paths.SourceFolder(opt.specie, opt.assembly, 'variants');

	//Create the folder
	mkdirp.sync(folder);

	//Create all the chromosomes
	for(var i = 0; i < Specie.chromosomes.length; i++)
	{
		//Get the chromosome
		var chr = Specie.chromosomes[i];

		//Get the command
		var command = Command(opt.specie, opt.assembly, 'variants');

		//Get the xml
		var xml = Xml(queryVariants, opt.specie, { '{CHROMOSOME}': chr });

		//Get the output file
		var output = path.join(folder, Paths.SourceFile(chr));

		//Replace the xml
		command = command.replace('{xml}', xml);

		//Replace the output file
		command = command.replace('{output}', output);

		//Show in console
		console.log('Downloading variants for chromosome ' + chr + '...');

		//Run the import
		var log = execSync(command, { stdio: 'ignore' });
	}

	//Show confirmation
	console.log('Download completed for ' + opt.specie + ' ' + opt.assembly);
};
