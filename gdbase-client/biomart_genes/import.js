//Import dependencies
var execSync = require('child_process').execSync;

//Import utils
var UtilsFile = require('../utils/file.js');
var UtilsBiomart = require('../utils/biomart.js');

//Function for import from biomart
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Get the output file
	var output = UtilsFile.Biomart(opt.specie, opt.assembly, opt.import);

	//Get the command
	var command = UtilsBiomart.Command();

	//Check the specie and assembly
	if(opt.specie === 'hsapiens' && opt.assembly === 'grch37')
	{
		//Replace in the command
		command = command.replace('{assembly}', 'grch37');
	}
	else
	{
		//Relace by default
		command = command.replace('{assembly}', 'www');
	}

	//Get the query object
	var query = require('./query/' + opt.import + '.json');

	//Get the xml
	var xml = UtilsBiomart.XML(query, opt.specie);

	//Replace the xml
	command = command.replace('{xml}', xml);

	//Replace the output file
	command = command.replace('{output}', output);

	//Show in console
	console.log('Wait...');

	//Run the import
	var log = execSync(command);

	//Show confirmation
	console.log('Saved as ' + output);
};
