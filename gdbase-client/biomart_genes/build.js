//Import dependencies
var fs = require('fs');

//Import biomart libs
var BuildExons = require('./build-exons.js');
var BuildGenes = require('./build-genes.js');
var BuildGenCode = require('./build-gencode.js');
var BuildTranscripts = require('./build-transcripts.js');

//Import utils
var UtilsFile = require('../utils/file.js');

//Function for build from biomart source
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Initialize the genes
	var genes = [];

	//Get the input file
	var input_genes = UtilsFile.Biomart(opt.specie, opt.assembly, 'genes');

	//Build the genes structure
	genes = BuildGenes(input_genes);

	//Check for build the transcripts
	if(opt.buildTranscripts === true)
	{
		//Get the input transcripts file
		var input_transcripts = UtilsFile.Biomart(opt.specie, opt.assembly, 'transcripts');

	  //Build the transcripts
	  genes = BuildTranscripts(input_transcripts, genes);
	}

	//Check for build the gencode
	if(opt.buildGencode === true)
	{
		//Get the input gencode file
		var input_gencode = UtilsFile.Biomart(opt.specie, opt.assembly, 'gencode');

	  //Build the gencode
	  genes = BuildGenCode(input_gencode, genes);
	}

	//Check for build the genes
	if(opt.buildExons === true)
	{
	  //Check if user has build the transcripts
	  if(opt.buildTranscripts === false){ return console.error('You must set the build transcripts options for build the exons...'); }

		//Get the input exons file
		var input_exons = UtilsFile.Biomart(opt.specie, opt.assembly, 'exons');

	  //Build exons
	  genes = BuildExons(input_exons, genes);
	}

	//Get the output file
	var output = UtilsFile.Output(opt.specie, opt.assembly);

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
