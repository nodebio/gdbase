//Import dependencies
var execSync = require('child_process').execSync;
var mkdirp = require('mkdirp');
var path = require('path');

//Import helpers
var Command = require('../helpers/command.js');
var ExtractGZ = require('../helpers/extract-gz.js');
var Paths = require('../helpers/paths.js');

//Function to import from ensembl FTP
module.exports = function(opt)
{
	//Parse the specie
	opt.specie = opt.specie.toLowerCase();

	//Parse the assembly
	opt.assembly = opt.assembly.toLowerCase();

	//Get the specie info
	var Specie = require('../../gdbase-specie/' + opt.specie + '.json');

	//Get the species source
	var SpecieSource = require('../source/' + opt.specie + '.json');

	//Get the source folder
	var folder = Paths.SourceFolder(opt.specie, opt.assembly, 'sequence');

	//Create the folder
	mkdirp.sync(folder, '0777');

	//Create all the chromosomes
	for(var i = 0; i < Specie.chromosomes.length; i++)
	{
		//Get the chromosome
		var chr = Specie.chromosomes[i];

		//Get the command
		var command = Command(opt.specie, opt.assembly, 'sequence');

		//Get the output file
		var output = path.join(folder, Paths.SourceFile(chr));

		//Replace the output file
		command = command.replace('{output}', output + '.gz');

		//Replace the command
		command = command.replace('{chromosome}', chr);

		//Show in console
		console.log('Downloading sequence for chromosome ' + chr + '...');

		//Run the import
		var log = execSync(command, { stdio: 'ignore' });

		//Command for extract the fasta
		var extract = ExtractGZ(output);

		//Extract the file
		log = execSync(extract, { stdio: 'ignore' });
	}

	//Show confirmation
	console.log('Download completed for ' + opt.specie + ' ' + opt.assembly);
};
