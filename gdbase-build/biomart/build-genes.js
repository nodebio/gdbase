//Import dependencies
var fs = require('fs');

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

	//Output genes array
	var genes = [];

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
	}

	//Return the genes list
	return genes;
}

//Exports to node
module.exports = BuildGenes;
