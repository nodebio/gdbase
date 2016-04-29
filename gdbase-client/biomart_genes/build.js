//Import dependencies
var fs = require('fs');
var path = require('path');

//Import biomart libs
var Build = {
	'exons': require('./build-exons.js'),
	'genes': require('./build-genes.js'),
	'gencode': require('./build-gencode.js'),
	'transcripts': require('./build-transcripts.js')
};

//Import utils
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
	var folder = UtilsData.Source(opt.specie, opt.assembly, 'genes');

	//Get the specie info
	var Specie = require('../species/' + opt.specie + '.json');

	//Initialize the genes
	var genes = [];

	//REad all the features
	for(var i = 0; i < Specie.features.length; i++)
	{
		//Get the feature
		var feature = Specie.features[i];

		//Get the input file
		var input = path.join(folder, UtilsData.SourceFile('biomart', 'genes', { feature: feature }));

		//Build the feature
		genes = Build[feature](input, genes);
	}

	//Get the output file
	var output = UtilsData.Output(opt.specie, opt.assembly, 'genes');

	//Initialize the output file
	fs.writeFileSync(output, '', 'utf8');

	//Read all genes
	for(var i = 0; i < genes.length; i++)
	{
	  //Save the line
	  fs.appendFileSync(output, JSON.stringify(genes[i]) + '\n', 'utf8');
	}

	//Show confirmation in console
	console.log('Output file saved on ' + output);
};
