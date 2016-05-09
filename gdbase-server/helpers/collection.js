//Import dependencies
var db = require('mongoware');

//Function to get the collection
module.exports = function(specie, assembly, dataset, subcategory)
{
	//Collection base
	var c = '{specie}_{assembly}_{dataset}_{subcategory}';

	//Replace the specie
	c = c.replace('{specie}', specie);

	//Replace the assembly
	c = c.replace('{assembly}', assembly);

	//Replace the dataset
	c = c.replace('{dataset}', dataset);

	//Replace the subcategory
	c = c.replace('{subcategory}', subcategory);

	//Return the collection
	return db.GetCollection(c);
};
