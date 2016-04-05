//Import dependencies
var fs = require('fs');

//Import biomart libs
var BuildExons = require('./biomart/build-exons.js');
var BuildGenes = require('./biomart/build-genes.js');
var BuildGenCode = require('./biomart/build-gencode.js');
var BuildTranscripts = require('./biomart/build-transcripts.js');

//Files
var files = { input: './source/biomart/{specie}_{assembly}_{type}.txt', output: '../gdbase-data/{specie}_{assembly}.json' };

//Function for build from biomart source
function Build(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Initialize the genes
	var genes = [];


	//Replace the specie
	files.input = files.input.replace('{specie}', opt.specie);
	files.output = files.output.replace('{specie}', opt.specie);

	//Replace the assembly
	files.input = files.input.replace('{assembly}', opt.assembly);
	files.output = files.output.replace('{assembly}', opt.assembly);


	//Show in console
	console.log('Build genes...');

	//Build the genes structure
	genes = BuildGenes(files.input.replace('{type}', 'genes'));

	//Show done in console
	console.log('Genes completed!');

	//Check for build the transcripts
	if(opt.buildTranscripts === true)
	{
	  //Show in console
	  console.log('Build transcripts...');

	  //Build the transcripts
	  genes = BuildTranscripts(files.input.replace('{type}', 'transcripts'), genes);

	  //Show done in console
	  console.log('Transcripts completed!');
	  console.log('');
	}

	//Check for build the gencode
	if(opt.buildGencode === true)
	{
	  //Show in console
	  console.log('Build GENCODE...');

	  //Build the gencode
	  genes = BuildGenCode(files.input.replace('{type}', 'gencode'), genes);

	  //Show done in console
	  console.log('GENCODE completed!');
	  console.log('');
	}

	//Check for build the genes
	if(opt.buildExons === true)
	{
	  //Show in console
	  console.log('Build exons...');

	  //Check if user has build the transcripts
	  if(opt.buildTranscripts === false){ return console.error('You must set the build transcripts options for build the exons...'); }

	  //Build exons
	  genes = BuildExons(files.input.replace('{type}', 'exons'), genes);

	  //Show done in console
	  console.log('Exons completed!');
	  console.log('');
	}


	//Initialize the output file
	fs.writeFileSync(files.output, '', 'utf8');

	//Read all genes
	for(var i = 0; i < genes.length; i++)
	{
	  //Save the line
	  fs.appendFileSync(files.output, JSON.stringify(genes[i]) + '\n', 'utf8');
	}

	//Show in console
	console.log('Build completed!');
	console.log('Output file saved on ' + files.output);
}

//Exports to node
module.exports = Build;
