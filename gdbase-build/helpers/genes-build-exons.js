//Import dependencies
var fs = require('fs');
var lineByLine = require('n-readlines');

//Import helpers
var ParseLine = require('./parse-line.js');

//Import query
var queryExons = require('../query/genes_exons.json');
var queryGenes = require('../query/genes_genes.json');
var queryTranscripts = require('../query/genes_transcripts.json');

//Build exons from file
function BuildExons(file, genes)
{
	//Open the file
	var liner = new lineByLine(file);

	//Initialize the line
	var line = '';

	//Output
	var out = {};

	//Read all the lines
	while(line = liner.next())
	{
		//Convert to string
		line = line.toString('utf8');

		//Check for empty line
		if(line === '' || line === ' '){ continue; }

		//Split by tab
		line = line.split('\t');

		//Get the gene name
		var gen = line[0];

		//Get the transcript name
		var tra = line[1];

		//Check the gene
		if(typeof out[gen] === 'undefined'){ out[gen] = {}; }

		//Check the transcript
		if(typeof out[gen][tra] === 'undefined'){ out[gen][tra] = []; }

		//Parse the line
		var obj = ParseLine(line, queryExons.attributes, ['gene', 'transcript']);

		//Save the transcript
		out[gen][tra].push(obj);
	}

	//Read all the genes
	for(var i = 0; i < genes.length; i++)
	{
		//Get the gene id
		var gen = genes[i].id;

		//Check if gene exists
		if(typeof out[gen] === 'undefined'){ continue; }

		//Read all the transcripts for this gene
		for(var j = 0; j < genes[i].transcripts.length; j++)
		{
			//Get the transcript id
			var tra = genes[i].transcripts[j].id;

			//Check if transcript exists
			if(typeof out[gen][tra] === 'undefined'){ continue; }

			//Save the transcript
			genes[i].transcripts[j].exons = out[gen][tra];
		}
	}

	//Return the updated genes list
	return genes;
}

//Exports to node
module.exports = BuildExons;
