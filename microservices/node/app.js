// Import Dependencies
// const restify	= require('restify');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const logger	= require('morgan');
const passport	= require('passport');
const jwt		= require('jsonwebtoken');
	
// Setting up the server
// const app	= restify.createServer({name: 'Simple Blog API'});
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require('./server/config/passport')(passport);

// Hashing wrk factor
SALT_WORK_FACTOR = 12;

app.use(cors({origin:true,credentials: true}));

// Setting up the logger for restify DOES EXPRESS NEED THIS?
// app.use(logger('dev'));
// Parsing incoming request data using restify
// app.use(restify.plugins.acceptParser(app.acceptable));
// app.use(restify.plugins.queryParser());
// app.use(restify.plugins.bodyParser());
// app.use(restify.plugins.urlEncodedBodyParser({mapParams: false}));
// app.use(restify.CORS());
// restify.CORS.ALLOW_HEADERS.push('authorization');

// Running up the passport
app.use(passport.initialize());

// initializing the route to the app
require('./server/routes')(app);
app.get('/', (req, res) => {
	res.send('Hello! The API is Up at http://localhost:' + port + '/api');
});

// setting up the port
const port = parseInt(process.env.PORT, 10) || '8000';
// const port = parseInt(process.env.PORT, 10) || '3000';
app.listen(port);

module.exports = app;