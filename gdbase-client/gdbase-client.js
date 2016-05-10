//GDBase client tool
//Usage: node gdbase-client.js command --specie <SPECIE> --assembly <ASSEMBLY> --dataset <DATASET>

//Import dependencies
var getArgs = require('get-args');

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
var action = './commands/' + args.command + '.js';

//Show in console
console.log('Running ' + action);

//Import
require(action)(args.options);
