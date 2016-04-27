//Import dependencies
var execSync = require('child_process').execSync;
var mkdirp = require('mkdirp');
var path = require('path');

//Import utils
var UtilsBiomart = require('../utils/biomart.js');
var UtilsData = require('../utils/data.js');

//Function for import from biomart
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Get the query object
	var query = require('./query/variants.json');

	//Import the specie info
	var Specie = require('../species/' + opt.specie + '.json');

	//Get the source folder
	var folder = UtilsData.Source(opt.specie, opt.assembly, 'variants');

	//Create the folder
	mkdirp.sync(folder);

	//Create all the chromosomes
	for(var i = 0; i < Specie.chromosomes.length; i++)
	{
		//Get the chromosome
		var chr = Specie.chromosomes[i];

		//Get the command
		var command = UtilsBiomart.Command(opt.specie, opt.assembly);

		//Create the replace object
		var rep = { '{CHROMOSOME}': chr };

		//Get the xml
		var xml = UtilsBiomart.XML(query, opt.specie, rep);

		//Get the output file
		var output = path.join(folder, UtilsData.SourceFile('biomart', 'variants', { chromosome: chr }));

		//Replace the xml
		command = command.replace('{xml}', xml);

		//Replace the output file
		command = command.replace('{output}', output);

		//Show in console
		console.log('Downloading variants for chromosome ' + chr + '...');

		//Run the import
		var log = execSync(command, { stdio: [ 0, 0, 1 ] });
	}

	//Show confirmation
	console.log('Download completed for ' + opt.specie + ' ' + opt.assembly);
};
