//Import dependencies
var fs = require('fs');
var path = require('path');

//Import helpers
var Biomart = require('../helpers/biomart.js');
var BuildExons = require('../helpers/genes-build-exons.js');
var BuildGenes = require('../helpers/genes-build-genes.js');
var BuildGencode = require('../helpers/genes-build-gencode.js');
var BuildTranscripts = require('../helpers/genes-build-transcripts.js');
var Paths = require('../helpers/paths.js');

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
	var folder_source = Paths.SourceDir(opt.specie, opt.assembly, 'genes');

	//Get the output folder
	var folder_output = Paths.OutputDir(opt.specie, opt.assembly, 'genes');

	//Get the specie info
	var Specie = require('../../gdbase-species/' + opt.specie + '.json');

	//Build
	var Build = { exons: BuildExons, genes: BuildGenes, gencode: BuildGencode, transcripts: BuildTranscripts };

	//Get the output index file
	var output_index = path.join(folder_output, Paths.OutputIndex());

	//Initialize the output index file
	fs.writeFileSync(output_index, '', 'utf8');

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
			var input = path.join(folder_source, Paths.SourceFile(chr, feature));

			//Build the feature
			genes = Build[feature](input, genes);
		}

		//Get the output json file
		var output_json = path.join(folder_output, Paths.OutputJson(chr));

		//Initialize the output json file
		fs.writeFileSync(output_json, '', 'utf8');

		//Read all genes
		for(var j = 0; j < genes.length; i++)
		{
			//Get the gene info
			var g = genes[j];

		  //Save the line
		  fs.appendFileSync(output_json, JSON.stringify(g) + '\n', 'utf8');

			//Create the index
			var index = { 'id': g.id, 'name': g.name, 'chromosome': g.chromosome };

			//Save the index
			fs.appendFileSync(output_index, JSON.stringify(index) + '\n', 'utf8');
		}
	}

	//Show in console
	console.log('Done!');
};
