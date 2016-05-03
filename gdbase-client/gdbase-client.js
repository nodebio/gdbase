//GDBase client tool
//Usage: node gdbase-client.js command --specie <SPECIE> --assembly <ASSEMBLY> --dataset <DATASET>

//Import dependencies
var getArgs = require('get-args');

//Source datasets
var source = require('./source.json');

//Get the command line args
var args = getArgs();

//Check the command
if(args.command === ''){ return console.error('No command provided...'); }

//Check the specie
if(typeof args.options.specie === 'undefined'){ return console.error('No specie provided...'); }

//Check the assembly
if(typeof args.options.assembly === 'undefined'){ return console.error('No assembly provided...'); }

//Check the dataset option
if(typeof args.options.dataset === 'undefined'){ return console.error('No dataset provided...'); }

//Get the action file
var action = './{source}_{dataset}/{command}.js';

//Replace the dataset
action = action.replace('{dataset}', args.options.dataset);

//Replace the command
action = action.replace('{command}', args.command);

//Source keys
var source_keys = Object.keys(source);

//Check the sources
for(var i = 0; i < source_keys.length; i++)
{
	//Get the source value
	var s = source[source_keys[i]];

	//Check
	if(s.indexOf(args.options.dataset) === -1){ continue; }

	//Replace
	action = action.replace('{source}', source_keys[i]);
}

//Show in console
console.log('Running ' + action);

//Import
require(action)(args.options);
