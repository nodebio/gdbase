//Import dependencies
var execSync = require('child_process').execSync;
var mkdirp = require('mkdirp');
var path = require('path');

//Import helpers
var Command = require('../helpers/command.js');
var Paths = require('../helpers/paths.js');
var Xml = require('../helpers/xml.js');

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

	//Read all the features to download
	for(var j = 0; j < SpecieSource.genes.features.length; j++)
	{
		//Get the feature
		var feature = SpecieSource.genes.features[j];

		//Get the source folder
		var folder = Paths.SourceFolder(opt.specie, opt.assembly, feature);

		//Create the folder
		mkdirp.sync(folder);

		//Read all the chromosomes
		for(var i = 0; i < Specie.chromosomes.length; i++)
		{
			//Get the chromosome
			var chr = Specie.chromosomes[i];

			//Show in console
			console.log('Downloading ' + feature + ' for chromosome ' + chr);

			//Get the output file
			var output = Paths.SourceFile(chr);

			//Get the command
			var command = Command(opt.specie, opt.assembly, 'genes');

			//Get the query object
			var query = require('../query/genes_' + feature + '.json');

			//Get the xml
			var xml = Xml(query, opt.specie, { 'CHROMOSOME': chr });

			//Replace the xml
			command = command.replace('{xml}', xml);

			//Replace the output file
			command = command.replace('{output}', path.join(folder, output));

			//Run the import
			var log = execSync(command, { stdio: 'ignore' });
		}
	}

	//Show confirmation
	console.log('Download completed for ' + opt.specie + ' ' + opt.assembly);
};
