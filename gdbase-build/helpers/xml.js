//Import helpers
var ReplaceValues = require('./replace-values.js');

//Function to build the biomart xml file
module.exports = function(obj, specie, rep)
{
	//Check the replace object
	if(typeof rep === 'undefined'){ var rep = {}; }

	//Add for replace the specie
	rep['SPECIE'] = specie;

	//Query object
	var query = { virtualSchemaName: 'default', formatter: 'TSV', header: '0', uniqueRows: '0',
	count: '', datasetConfigVersion: '0.6' };

	//Check for filters
	if(typeof obj.filters === 'undefined'){ obj.filters = []; }

	//Check for attributes
	if(typeof obj.attributes === 'undefined'){ obj.attributes = []; }

	//Initialize the xml string
	var xml = '<?xml version="1.0" encoding="UTF-8"?>';

	//Add the doctype
	xml = xml + '<!DOCTYPE Query>';

	//Add the query
	xml = xml + '<Query ' + XMLArgs(query) + '>';

	//Add the dataset
	xml = xml + '<Dataset ' + XMLArgs(obj.dataset) + '>';

	//Add the filters
	for(var i = 0; i < obj.filters.length; i++)
	{
		//Add the new filter
		xml = xml + '<Filter ' + XMLArgs(obj.filters[i]) + '/>';
	}

	//Add the attributes
	for(var i = 0; i < obj.attributes.length; i++)
	{
		//Add the new attribute
		xml = xml + '<Attribute ' + XMLArgs(obj.attributes[i], ['id', 'type']) + '/>';
	}

	//Close the dataset
	xml = xml + '</Dataset>';

	//Close the query
	xml = xml + '</Query>';

	//Replace on the xml file
	xml = ReplaceValues(xml, rep);

	//Return the xml
	return xml;
};

//Function for add the xml args
function XMLArgs(obj, exclude)
{
	//Output
	var out = '';

	//Check the exclude args
	if(typeof exclude === 'undefined'){ var exclude = []; }

	//Get all the keys on the object
	var keys = Object.keys(obj);

	//Read all
	for(var i = 0; i < keys.length; i++)
	{
		//Get the key
		var k = keys[i];

		//Check for exclude
		if(exclude.indexOf(k) > -1){ continue; }

		//Add the argument
		out = out + k + '="' + obj[k] + '" ';
	}

	//Return the output
	return out;
};
