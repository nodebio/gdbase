//Import dependencies
var fs = require('fs');
var objectSort = require('objectsort');

//Import libs
var ParseLine = require('./parse-line.js');

//Import query
var queryGenes = require('./query/genes.json');

//Build genes from file
function BuildGenes(file)
{
	//Get the file content
	var content = fs.readFileSync(file, 'utf8');

	//Remove \r
	content = content.replace(/\r/g, '');

	//Split by line break
	content = content.split('\n');

	//Show in console
	process.stdout.write('Build genes: ');

	//Output genes array
	var genes = [];

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

		//Parse the line
		var obj = ParseLine(line, queryGenes.attributes, []);

		//Save the gene
		genes.push(obj);

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

	//Sort the genes by chromosome and start
	genes = objectSort(genes, ['chromosome', 'start']);

	//Show completed in console
	process.stdout.write('  Completed!\n');

	//Return the genes list
	return genes;
}

//Exports to node
module.exports = BuildGenes;
