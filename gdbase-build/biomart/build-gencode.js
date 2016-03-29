//Import dependencies
var fs = require('fs');

//Import libs
var ParseLine = require('./parse-line.js');

//Import query
var queryGenes = require('./query/genes.json');
var queryGenCode = require('./query/genes_gencode.json');
var queryTranscripts = require('./query/transcripts.json');

//Build gencode from file
function BuildGenCode(file, genes)
{
	//Get the file content
	var content = fs.readFileSync(file, 'utf8');

	//Remove \r
	content = content.replace(/\r/g, '');

	//Split by line break
	content = content.split('\n');

	//Gencode object
	var gencode = {};

	//Read all lines
	for(var i = 0; i < content.length; i++)
	{
		//Get the line
		var line = content[i];

		//Check for empty line
		if(line === '' || line === ' '){ continue; }

		//Split by tab
		line = line.split('\t');

		//Save the gene
		var gen = line[0];

		//Check if gene exists
		if(typeof gencode[gen] === 'undefined')
		{
			//Create the new gene object
			gencode[gen] = [];
		}

		//Parse the line
		//var obj = ParseLine(line, queryGenCode.attributes, ['gene', 'biotype']);

		//Save the gene
		gencode[gen].push(line[1]);
	}

	//Read all the genes
	for(var i = 0; i < genes.length; i++)
	{
		//Get the gene ID
		var gen = genes[i].id;

		//Check if gene exists
		if(typeof gencode[gen] === 'undefined'){ continue; }

		//Add the gencode flag
		genes[i].gencode = true;

		//Check the transcripts
		if(typeof genes[i].transcripts === 'undefined'){ continue; }

		//Read all the transcripts
		for(var j = 0; j < genes[i].transcripts.length; j++)
		{
			//Get the transcript
			var tr = genes[i].transcripts[j];

			//Check if transcript exists
			if(gencode[gen].indexOf(tr) < 0){ continue; }

			//Add the gencode flag to transcript
			genes[i].transcripts[j].gencode = true;
		}
	}

	//Return the genes list
	return genes;
}

//Exports to node
module.exports = BuildGenCode;
