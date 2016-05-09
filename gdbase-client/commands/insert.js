//Import dependencies
var execSync = require('child_process').execSync;
var db = require('mongoware');
var fs = require('fs');
var path = require('path');

//Import helpers
var Command = require('../helpers/command.js');
var ReplaceValues = require('../helpers/replace-values.js');

//Import config file
var Config = require('../../gdbase-config.json');

//Function to insert a dataset in mongodb
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Get the specie info
	var Specie = require('../../gdbase-species/' + opt.specie + '.json');

	//Get the collection
	var collection = ReplaceValues('{s}_{a}_{d}', { s: opt.specie, a: opt.assembly, d: opt.dataset });

	//Generate the folder
	var folder = path.join(Config.data.path, collection);

	//Get the files list
	var files = fs.readdirSync(folder);

	//Full list
	var list = [];

	//Read all the chromosomes
	for(var i = 0; i < Specie.chromosomes.length; i++)
	{
		//Get the chromosome
		var chr = Specie.chromosomes[i];

		//Get the file
		var file = 'chromosome_' + chr + '.json';

		//Find the chromosome
		if(files.indexOf(file) === -1){ continue; }

		//SAve the file
		list.push('chromosome_' + chr);
	}

	//Check the index file
	if(files.indexOf('index.json') !== -1)
	{
		//Save the index file
		list.push('index');
	}

	//Connect to database
	db.Connect(Config.db, function(err){

		//Check for error
		if(err){ process.exit(1); }

		//Run the insert
		InsertDB(list, 0, Specie, opt, folder, function(){

			//Close the connection
			db.Close(function(){ process.exit(0); });

		});

	});

};

//Function to insert recursive
function InsertDB(list, index, Specie, opt, folder, callback)
{
	//Check the index
	if(index >= list.length)
	{
		//Do the callback
		return callback();
	}

	//Get the element
	var element = list[index];

	//Create the dataset
	var dataset = opt.dataset + '_' + element;

	//Get the collection
	var collection = ReplaceValues('{s}_{a}_{d}', { s: opt.specie, a: opt.assembly, d: dataset });

	//Get the input file
	var file = path.join(folder, './' + element + '.json');

	//Get the insert command
	var command = Command.Insert(Config.db, file, collection);

	//Show in console
	console.log('Inserting ' + collection);

	//Run the command
	var log = execSync(command, { stdio: [ 0, 1, 2 ] });

	//Show in console
	console.log('Indexing ' + collection);

	//Create the index object
	var obj = Specie.index[opt.dataset];

	//Check the indexed
	if(element === 'index'){ obj = Specie.index[opt.dataset + '_index']; }

	//Run
	db.GetCollection(collection).createIndex(obj, function(err, created){

		//Check for error
		if(err){ return err; }

		//Else
		console.log('Indexes created: ' + created);

		//Continue
		return InsertDB(list, index + 1, Specie, opt, folder, callback);

	});
}
