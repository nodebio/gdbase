//Connection url
//mongodb://USERNAME:PASSWORD@DBHOST:DBPORT/DBNAME

//Import dependencies
var MongoClient = require('mongodb').MongoClient;

//Database
var db = null;

//Connect to database
exports.Connect = function(opt, callback)
{
	//Check the database status
	if(db){ return callback(); }

	//Create the url
	var url = 'mongodb://' + opt.user + ':' + opt.pass + '@' + opt.host + ':' + opt.port + '/' + opt.db;

	//Else, connect to database
  MongoClient.connect(url, function(err, datab){

		//Check for error
		if(err)
		{
			//Show error in console
			console.error(err);

			//Return with error
			return callback(err);
		}

		//Save the database connection
    db = datab;

		//Do the callback
    callback();

  });
};

//Get the database
exports.Get = function(){ return db; };

//Close the connection
exports.Close = function(callback){

	//Check the database status
  if(state.db)
	{
		//Close the connection to the database
    state.db.close(function(err, result){

			//Destroy the database
			db = null;

			//Do the callback
      callback(err);
    });

  }
};
