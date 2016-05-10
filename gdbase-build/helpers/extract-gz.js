//Function to extract the gz file
module.exports = function(file)
{
	//Command template
	var command = 'gzip -d {file}';

	//Replace the file
	command = command.replace('{file}', file + '.gz');

	//Return the command
	return command;
};
