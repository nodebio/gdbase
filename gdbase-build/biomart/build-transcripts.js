//Import dependencies
var fs = require('fs');

//Import libs
var ParseLine = require('./parse-line.js');

//Import query
var queryGenes = require('./query/genes.json');
var queryTranscripts = require('./query/transcripts.json');

//Build genes from file
function BuildTranscripts(file, genes)
{
	//Get the file content
	var content = fs.readFileSync(file, 'utf8');

	//Remove \r
	content = content.replace(/\r/g, '');

	//Split by line break
	content = content.split('\n');

	//Output transcripts
	var tr = {};

	//Show in console
	console.log('Detected ' + content.length + ' transcripts from ' + file);

	//Read all lines
	for(var i = 0; i < content.length; i++)
	{
		//Get the line
		var line = content[i];

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
module.exports = BuildGenes;
