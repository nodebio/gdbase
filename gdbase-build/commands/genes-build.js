//Import dependencies
var fs = require('fs');
var mkdirp = require('mkdirp');
var objectsort = require('objectsort');
var path = require('path');

//Import helpers
var BuildExons = require('../helpers/genes-build-exons.js');
var BuildGenes = require('../helpers/genes-build-genes.js');
var BuildGencode = require('../helpers/genes-build-gencode.js');
var BuildTranscripts = require('../helpers/genes-build-transcripts.js');
var Paths = require('../helpers/paths.js');

//Import the config file
var Config = require('../../gdbase-config.json');

//Function to build genes
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Get the output json folder
	var folder_output = Paths.OutputFolder(opt.specie, opt.assembly, 'genes');

	//Create the output folder
	mkdirp.sync(folder_output, '0777');

	//Get the specie info
	var Specie = require('../../gdbase-specie/' + opt.specie + '.json');

	//Get the species source
	var SpecieSource = require('../source/' + opt.specie + '.json');

	//Build
	var Build = { exons: BuildExons, genes: BuildGenes, gencode: BuildGencode, transcripts: BuildTranscripts };

	//Full genes list
	var list = [];

	//Read all the chromosomes
	for(var i = 0; i < Specie.chromosomes.length; i++)
	{
		//Get the chromosome
		var chr = Specie.chromosomes[i];

		//Show in console
		console.log('Building genes for chromosome ' + chr);

		//Initialize the genes
		var genes = [];

		//Get the source file
		var file_source = Paths.SourceFile(chr);

		//Read all the features
		for(var j = 0; j < SpecieSource.genes.features.length; j++)
		{
			//Get the feature
			var feature = SpecieSource.genes.features[j];

			//Get the source folder
			var folder_source = Paths.SourceFolder(opt.specie, opt.assembly, feature);

			//Build the feature
			genes = Build[feature](path.join(folder_source, file_source), genes);
		}

		//Get the output file
		var file_output = path.join(folder_output, Paths.OutputFile(chr));

		//Initialize the output json file
		fs.writeFileSync(file_output, '', 'utf8');

		//Read all genes
		for(var j = 0; j < genes.length; j++)
		{
			//Get the gene info
			var g = genes[j];

		  //Save the line
		  fs.appendFileSync(file_output, JSON.stringify(g) + '\n', 'utf8');

			//Save the index
			list.push({ id: g.id, name: g.name, chromosome: g.chromosome });
		}
	}

	//Sort the genes list
	list = objectsort(list, 'name');

	//Get the index file
	var file_index = path.join(folder_output, Paths.OutputIndex());

	//Initialize the index file
	fs.writeFileSync(file_index, '', 'utf8');

	//Read all genes
	for(var j = 0; j < list.length; j++)
	{
		//Save to the index file
		fs.appendFileSync(file_index, JSON.stringify(list[j]) + '\n', 'utf8');
	}

	//Show in console
	console.log('Done!');
};
