//Biomart Import
//Usage: node biomart-import.js --specie <SPECIE> --assembly <ASSEMBLY> --dataset <DATASET>

//Import dependencies
var commandLineArgs = require('command-line-args');

//Initialize the command line arguments options
var cli = commandLineArgs([
  { name: 'specie', type: String },
  { name: 'assembly', type: String },
  { name: 'dataset', type: String }
]);

//Get the command line args
var opt = cli.parse();

//Check the specie
if(typeof opt.specie === 'undefined'){ return console.error('No specie provided...'); }

//Check the assembly
if(typeof opt.assembly === 'undefined'){ return console.error('No assembly provided...'); }

//Check the dataset option
if(typeof opt.dataset === 'undefined'){ return console.error('No dataset provided...'); }

//Import
require('./biomart_' + opt.dataset + '/import.js')(opt);
