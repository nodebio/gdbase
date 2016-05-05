//Import dependencies
var fs = require('fs');
var lineByLine = require('n-readlines');

//Import helpers
var ParseLine = require('./parse-line.js');

//Import query
var queryGenes = require('../query/genes_genes.json');
var queryTranscripts = require('../query/genes_transcripts.json');

//Build genes from file
function BuildTranscripts(file, genes)
{
	//Open the file
	var liner = new lineByLine(file);

	//Initialize the line
	var line = '';

	//Output transcripts
	var tr = {};

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

		//Check the gene
		if(typeof tr[gen] === 'undefined')
		{
			//Create the new gene
			tr[gen] = [];
		}

		//Parse the line
		var obj = ParseLine(line, queryTranscripts.attributes, ['gene']);

		//Save the transcript
		tr[gen].push(obj);
	}

	//Read all the genes
	for(var i = 0; i < genes.length; i++)
	{
		//Get the gene id
		var id = genes[i].id;

		//Check if gene exists
		if(typeof tr[id] === 'undefined'){ continue; }

		//Save the transcripts
		genes[i].transcripts = tr[id];
	}

	//Return the updated genes list
	return genes;
}

//Exports to node
module.exports = BuildTranscripts;
