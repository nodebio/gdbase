//Import helpers
var GetCollection = require('../helpers/collection.js');

//Get info by ID
exports.id = function(query, specie, assembly, dataset, callback)
{
	//Get the subcategory
	var subcategory = 'index';

	//Get the collection
	var collection = GetCollection(specie, assembly, dataset, subcategory);

	//Get the query in lower case
	var qlc = query.toLowerCase();

	//Get the query in upper case
	var quc = query.toUpperCase();

	//Create the find argument
	var find = { $or: [ { id: query }, { id: qlc }, { id: quc },  { name: query }, { name: qlc }, { name: quc } ] };

	//Get the chromosome
	collection.find(find).toArray(function(err, docs){

		//Check the length
		if(docs.length === 0){ return callback([]); }

		//Update the subcategory
		subcategory = 'chromosome_' + docs[0].chromosome;

		//Update the collection
		collection = GetCollection(specie, assembly, dataset, subcategory);

		//Find by ID
		collection.find(find).toArray(function(err, docs2){ return callback(docs2); });

	});
};

//Get info by region
exports.region = function(query, specie, assembly, dataset, callback)
{
	//Get the subcategory
	var subcategory = 'chromosome_' + query.chromosome;

	//Get the collection
	var collection = GetCollection(specie, assembly, dataset, subcategory);

	//Create the find argument
	var find = { start: { $lte: query.end }, end: { $gte: query.start } };

	//Find by region
	collection.find(find).toArray(function(err, docs){ return callback(docs); });
};
