//Import dependencies
var fs = require('fs');
var lineByLine = require('n-readlines');
var objectSort = require('objectsort');

//Import helpers
var ParseLine = require('./parse-line.js');

//Import query
var queryGenes = require('../query/genes_genes.json');

//Build genes from file
function BuildGenes(file)
{
	//Open the file
	var liner = new lineByLine(file);

	//Initialize the line
	var line = '';

	//Output genes array
	var genes = [];

	//Read all the lines
	while(line = liner.next())
	{
		//Convert to string
		line = line.toString('utf8');

		//Check for empty line
		if(line === '' || line === ' '){ continue; }

		//Split by tab
		line = line.split('\t');

		//Parse the line
		var obj = ParseLine(line, queryGenes.attributes, []);

		//Save the gene
		genes.push(obj);
	}

	//Sort the genes by chromosome and start
	genes = objectSort(genes, ['chromosome', 'start']);

	//Return the genes list
	return genes;
}

//Exports to node
module.exports = BuildGenes;
