//Import dependencies
var express = require('express');

//Import middlewares
var SetHeaders = require('../middlewares/set-headers.js');

//Import models
var Species = require('../models/species.js');

//Create the new router
var router = express.Router();

//Find By ID
router.get('', SetHeaders.JSON, function(req, res, next){

	//Get the species list
	var list = Species.List();

	//Show the list
	return res.json(list);
	
});

//Exports to node
module.exports = router;
