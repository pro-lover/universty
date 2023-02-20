﻿require('rootpath')();
const path = require('path');
const fs = require("fs");
const https = require("https");
const http = require("http");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const csrf = require('csurf');

const logger = require('morgan');
const loggColour = require('node-color-log');

const API_VERSION = 'v1';
const port = 4008;

const csrfHandler = require( path.join(__dirname, 'api/' + API_VERSION + '/middleware/csrf-handler') );
const errorHandler = require( path.join(__dirname, 'api/' + API_VERSION + '/middleware/error-handler') );

//WEBSOCKET
//const WebSocket = require('ws');
//const websocketServer = require(path.join(__dirname,  'api/' + API_VERSION + '/shared/server.websocket'));

// You can set morgan to log differently depending on your environment
/**/
if ( process.env.NODE_ENV == 'production') {
	// create a write stream (in append mode)
	const accessLogStream = fs.createWriteStream(path.join(__dirname, 'api/' + API_VERSION + '/morgan.log'), { flags: 'a' });

	app.use(logger('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: accessLogStream }));

} else {
	app.use(logger('dev'));
}
/**/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

//Compress all routes
app.use(compression());

//app.use(express.static(app.root + '/assets/public', { maxAge: 86400000 /* 1d */ }));
app.use(express.static( path.join(__dirname, 'api/assets/scripts')));
app.use(express.static( path.join(__dirname, 'api/assets/public')));


//protect against well known vulnerabilities
app.use(helmet());

const csrfProtection = csrf({
	cookie: {
		key: 'XSRF-TOKEN'
	},
	//ignoreMethods: ['OPTIONS'],
	//ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
});

app.set('trust proxy', 1);

// api access routes
app.use('/accounts', csrfProtection, csrfHandler, require(path.join(__dirname, 'api/' + API_VERSION + '/controllers/accounts.controller')));
// api core routes
app.use('/clients', csrfProtection, csrfHandler, require(path.join(__dirname, 'api/' + API_VERSION + '/controllers/clients.controller')));
app.use('/brandKPIs', csrfProtection, csrfHandler, require(path.join(__dirname, 'api/' + API_VERSION + '/controllers/brand-KPIs.controller')));
app.use('/brands', csrfProtection, csrfHandler, require(path.join(__dirname, 'api/' + API_VERSION + '/controllers/brands.controller')));
app.use('/briefPhases', csrfProtection, csrfHandler, require(path.join(__dirname, 'api/' + API_VERSION + '/controllers/brief-phases.controller')));
app.use('/briefs', csrfProtection, csrfHandler, require(path.join(__dirname, 'api/' + API_VERSION + '/controllers/briefs.controller')));
app.use('/creativeExecutions', csrfProtection, csrfHandler, require(path.join(__dirname, 'api/' + API_VERSION + '/controllers/creative-executions.controller')));
app.use('/creatives', csrfProtection, csrfHandler, require(path.join(__dirname, 'api/' + API_VERSION + '/controllers/creatives.controller')));
app.use('/jobLevels', csrfProtection, csrfHandler, require(path.join(__dirname, 'api/' + API_VERSION + '/controllers/job-levels.controller')));
app.use('/jobTitles', csrfProtection, csrfHandler, require(path.join(__dirname, 'api/' + API_VERSION + '/controllers/job-titles.controller')));
app.use('/teams', csrfProtection, csrfHandler, require(path.join(__dirname, 'api/' + API_VERSION + '/controllers/teams.controller')));

// swagger docs route
app.use('/api-docs', require( path.join(__dirname, 'api/' + API_VERSION + '/shared/swagger') ) );

// global error handler
app.use(errorHandler);



// HTTPS start server
if( process.env.NODE_ENV === 'production' ) {
	const httpsServer = https.createServer({
		key: fs.readFileSync('/opt/bitnami/apache/conf/cmdbanner.io.key'), // cert invalid
		cert: fs.readFileSync('/opt/bitnami/apache/conf/cmdbanner.io.crt'), // cert invalid
	}, app).listen(port, () => console.log('HTTPS Server listening on port ' + port));

	//websocketServer.bootup(httpsServer);

} else {

	//app.listen(port, () => console.log('HTTP Server listening on port ' + port));

	//initialize a simple http server
	const server = http.createServer(app);

	server.listen(port, () => {
		console.log(`HTTP server started on port ${server.address().port} :)`);
	});

	//initialize the WebSocket server instance
	//websocketServer.bootup(server);
}
