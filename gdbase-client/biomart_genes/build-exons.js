//Import dependencies
var fs = require('fs');

//Import utils
var ParseLine = require('../utils/parse-line.js');

//Import query
var queryExons = require('./query/exons.json');
var queryGenes = require('./query/genes.json');
var queryTranscripts = require('./query/transcripts.json');

//Build exons from file
function BuildExons(file, genes)
{
	//Get the file content
	var content = fs.readFileSync(file, 'utf8');

	//Remove \r
	content = content.replace(/\r/g, '');

	//Split by line break
	content = content.split('\n');

	//Show in console
	process.stdout.write('Build exons: ');

	//Output
	var out = {};

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

	//Show completed in console
	process.stdout.write('  Completed!\n');

	//Return the updated genes list
	return genes;
}

//Exports to node
module.exports = BuildExons;
