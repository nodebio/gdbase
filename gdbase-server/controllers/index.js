//Import dependencies
var express = require('express');

//Create the new route
var router = express.Router();

//Get controller
router.use('/get', require('./get.js'));

//Get species controller
router.use('/species', require('./species.js'));

//Exports to node
module.exports = router;
