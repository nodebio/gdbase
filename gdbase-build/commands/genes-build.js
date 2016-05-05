//Import dependencies
var fs = require('fs');
var path = require('path');

//Import helpers
var Biomart = require('../helpers/biomart.js');
var BuildExons = require('../helpers/genes-build-exons.js');
var BuildGenes = require('../helpers/genes-build-genes.js');
var BuildGencode = require('../helpers/genes-build-gencode.js');
var BuildTranscripts = require('../helpers/genes-build-transcripts.js');
var Data = require('../helpers/data.js');

//Import the config file
var Config = require('../../gdbase-config.json');

//Function to build from biomart source
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Get the source folder
	var folder = UtilsData.Source(opt.specie, opt.assembly, 'genes');

	//Get the specie info
	var Specie = require('../../gdbase-species/' + opt.specie + '.json');

	//Build
	var Build = { exons: BuildExons, genes: BuildGenes, gencode: BuildGencode, transcripts: BuildTranscripts };

	//Read all the chromosomes
	for(var i = 0; i < Specie.chromosomes.length; i++)
	{
		//Get the chromosome
		var chr = Specie.chromosomes[i];

		//Show in console
		console.log('Building genes for chromosome ' + chr);

		//Initialize the genes
		var genes = [];

		//Read all the features
		for(var j = 0; j < Specie.features.length; j++)
		{
			//Get the feature
			var feature = Specie.features[j];

			//Get the input file
			var input = path.join(folder, UtilsData.SourceFile('genes', { feature: feature }));

			//Build the feature
			genes = Build[feature](input, genes);
		}

		//Get the output file
		var output = UtilsData.Output(opt.specie, opt.assembly, 'genes');

		//Initialize the output file
		fs.writeFileSync(output, '', 'utf8');

		//Read all genes
		for(var j = 0; j < genes.length; i++)
		{
		  //Save the line
		  fs.appendFileSync(output, JSON.stringify(genes[j]) + '\n', 'utf8');
		}
	}

	//Show in console
	console.log('Done!');
};
