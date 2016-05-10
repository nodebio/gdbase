//Function to find a column in the array
module.exports = function(list, key, find)
{
	//Read the list
	for(var i = 0; i < list.length; i++)
	{
		//Check the key
		if(list[i][key] !== find){ continue; }

		//Return the index
		return i;
	}

	//Return -1
	return -1;
};
