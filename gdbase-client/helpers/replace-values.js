//Function to replace values in a string
module.exports = function(str, values)
{
	//Read all the values
	for(var key in values)
	{
		//Get the value
		var value = values[key];

		//Create the regexp
		var exp = new RegExp('{' + key + '}', 'g');

		//Replace the value
		str = str.replace(exp, value);
	}

	//Return the string
	return str;
};
