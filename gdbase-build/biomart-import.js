//Biomart Import
//Usage: node biomart-import.js --specie SPECIE --assembly ASSEMBLY --import IMPORT

//Import dependencies
var commandLineArgs = require('command-line-args');
var execSync = require('child_process').execSync;

//Import libs
var BiomartXML = require('./biomart/xml.js');

//Command template
var command = 'wget -O {output} \'http://{assembly}.ensembl.org/biomart/martservice?query={xml}\'';

//Output file
var output = './source/biomart/{specie}_{assembly}_{import}.txt';

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

//Parse the specie
opt.specie = opt.specie.toLowerCase();

//Parse the assembly
opt.assembly = opt.assembly.toLowerCase();

//Show in console
console.log('');
console.log('Specie:   ' + opt.specie);
console.log('Assembly: ' + opt.assembly);
console.log('');

//Check the specie and assembly
if(opt.specie === 'hsapiens' && opt.assembly === 'grch37')
{
	//Replace on the command
	command = command.replace('{assembly}', 'grch37');
}
else
{
	//Relace by default
	command = command.replace('{assembly}', 'www');
}

//Get the query object
var query = require('./biomart/query/' + opt.import + '.json');

//Get the xml
var xml = BiomartXML(query, opt.specie);

//Replace the xml
command = command.replace('{xml}', xml);

//Replace the specie on the putput file
output = output.replace('{specie}', opt.specie);

//Replace the assembly on the output file
output = output.replace('{assembly}', opt.assembly);

//Replace the import type on the output file
output = output.replace('{import}', opt.import);

//Replace the output file
command = command.replace('{output}', output);

//Show in console
console.log('Wait...');

//Run the import
var log = execSync(command);

//Show confirmation
console.log('Saved as ' + output);
