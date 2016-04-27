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

	//Show in console
	process.stdout.write('Build transcripts: ');

	//Output transcripts
	var tr = {};

	//Counter
	var counter = 1;

	//Add new hastag
	var hash = content.length/10;

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

		//Increment the counter
		counter = counter + 1;

		//Check for add a new hastag
		if(counter > hash)
		{
			//Add a new #
			process.stdout.write('#');

			//Restart the counter
			counter = 1;
		}
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

	//Show completed in console
	process.stdout.write('  Completed!\n');

	//Return the updated genes list
	return genes;
}

//Exports to node
module.exports = BuildTranscripts;
