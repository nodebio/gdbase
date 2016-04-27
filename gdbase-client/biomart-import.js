//Biomart Import
//Usage: node biomart-import.js --specie SPECIE --assembly ASSEMBLY --import IMPORT

//Import dependencies
var commandLineArgs = require('command-line-args');

//Initialize the command line arguments options
var cli = commandLineArgs([
  { name: 'specie', type: String },
  { name: 'assembly', type: String },
  { name: 'import', type: String }
]);

//Get the command line args
var opt = cli.parse();

//Check the specie
if(typeof opt.specie === 'undefined'){ return console.error('No specie provided...'); }

//Check the assembly
if(typeof opt.assembly === 'undefined'){ return console.error('No assembly provided...'); }

//Check the import option
if(typeof opt.import === 'undefined'){ return console.error('No import feature provided...'); }

//Import
require('./biomart/import.js')(opt);
