//Function to get the biomart command
module.exports.Command = function(specie, assembly)
{
	//Create the base command
	var command = 'wget -O {output} \'http://{assembly}.ensembl.org/biomart/martservice?query={xml}\'';

	//Check the specie and assembly
	if(specie === 'hsapiens' && assembly === 'grch37')
	{
		//Replace in the command
		command = command.replace('{assembly}', 'grch37');
	}
	else
	{
		//Relace by default
		command = command.replace('{assembly}', 'www');
	}

	//Return the command
	return command;
};

//Function to build the xml file
module.exports.XML = function(obj, specie)
{
	//Query object
	var query = { virtualSchemaName: 'default', formatter: 'TSV', header: '0', uniqueRows: '0',
	count: '', datasetConfigVersion: '0.6' };

	//Dataset object
	var dataset = { name: "{specie}_gene_ensembl", interface: "default" };

	//Replace the dataset specie name
	dataset.name = dataset.name.replace('{specie}', specie);

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
	xml = xml + '<Dataset ' + XMLArgs(dataset) + '>';

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
		xml = xml + '<Attribute ' + XMLArgs(obj.attributes[i], ['id']) + '/>';
	}

	//Close the dataset
	xml = xml + '</Dataset>';

	//Close the query
	xml = xml + '</Query>';

	//Return the xml
	return xml;
}

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
		out = out + k + ' = "' + obj[k] + '" ';
	}

	//Return the output
	return out;
};
