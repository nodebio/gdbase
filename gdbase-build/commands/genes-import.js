//Import dependencies
var execSync = require('child_process').execSync;
var mkdirp = require('mkdirp');
var path = require('path');

//Import helpers
var Biomart = require('../helpers/biomart.js');
var Paths = require('../helpers/data.js');

//Function to import from biomart
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Get the specie info
	var Specie = require('../../gdbase-species/' + opt.specie + '.json');

	//Get the source folder
	var folder = Paths.SourceDir(opt.specie, opt.assembly, 'genes');

	//Create the folder
	mkdirp.sync(folder);

	//Read all the chromosomes
	for(var i = 0; i < Specie.chromosomes.length; i++)
	{
		//Get the chromosome
		var chr = Specie.chromosomes[i];

		//Show in console
		console.log('Importing genes for chromosome ' + chr);

		//Read all the features to download
		for(var j = 0; j < Specie.features.length; j++)
		{
			//Get the feature
			var feature = Specie.features[j];

			//Get the command
			var command = Biomart.Command(opt.specie, opt.assembly);

			//Get the query object
			var query = require('../query/genes_' + feature + '.json');

			//Get the xml
			var xml = Biomart.XML(query, opt.specie, { '{CHROMOSOME}': chr });

			//Get the output file
			var output = path.join(folder, Paths.SourceFile(chr, feature));

			//Replace the xml
			command = command.replace('{xml}', xml);

			//Replace the output file
			command = command.replace('{output}', output);

			//Show in console
			console.log('Downloading ' + feature + ' for ' + opt.specie + '...');

			//Run the import
			var log = execSync(command, { stdio: 'ignore' });
		}
	}

	//Show confirmation
	console.log('Download completed for ' + opt.specie + ' ' + opt.assembly);
};
