//Set the json header
exports.JSON = function(req, res, next)
{
	//Set the json header
	res.set('Content-Type', 'application/json');

	//Continue
	return next();
};

//Set the CORS
exports.CORS = function(req, res, next)
{
	//Set the allow origin
	res.header("Access-Control-Allow-Origin", "*");

	//Set the allow headers
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	//Continue
  return next();
};
