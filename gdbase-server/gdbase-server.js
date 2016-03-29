//Import dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//Import helpers
var db = require('./helpers/db.js');

//Import config
var Config = require('../gdbase-config.json');

//Create the new app
var app = express();

//Set port
app.set('port', Config.server.port);

//EJS engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Static files
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //Favicon
app.use(express.static(path.join(__dirname, 'public')));

//Boddy parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Cookies and session
app.use(cookieParser('CEAF3FA4-F385-49AA-8FG6-54766A9874F2'));
app.use(session({secret: '59B93087-70BC-4EB9-993A-A61FC302F6C0'}));

//Enable the cors
app.use(require('./middlewares/set-header.js').CORS);

//Connect to database
db.Connect(Config.db, function(err){ if(err){ process.exit(1); } });

//Set the controllers and path
app.use(require('./controllers/index.js'));

//Other: error
app.all('*', function(req, res){ res.status(404).send(); });

//Production error handler
app.use(function(err, req, res, next){

	//Set the error status
	res.status(err.status || 500);

	//Render the error page
	res.render('error', { message: err.message,  error: err});

});

//Create server
http.createServer(app).listen(app.get('port'), function(){

	//Show confirmation message
	console.log('Server listening on port ' + app.get('port'));

});
