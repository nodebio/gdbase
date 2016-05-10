//Get the command to download the data
module.exports = function(s, a, d)
{
	//Create the base command
	var command = 'wget -O {output} \'http://{url}\'';

	//Get the source file for this specie
	var source = require('../source/' + s + '.json');

	//Replace in the command
	command = command.replace('{url}', source[d]['url_' + a]);

	//Return the command
	return command;
};
