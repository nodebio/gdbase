//Import helpers
var ReplaceValues = require('./replace-values.js');

//Function to get the insert command
exports.Insert = function(db, file, collection)
{
	//Base command
	var base = 'mongoimport --host {host} --port {port} -u {user} -p {pass} --authenticationDatabase {auth} --db {db} --collection {collection} --type json --file {file}';

	//Replace the database options
	base = ReplaceValues(base, db);

	//Replace the collection
	base = ReplaceValues(base, { collection: collection });

	//Replace the file
	base = ReplaceValues(base, { file: file });

	//Return the command
	return base;
};
