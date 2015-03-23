'use strict';

// imports
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session');
var serveStatic = require('serve-static');
var logger = require('morgan');
var ejs = require('ejs');
var path = require('path');
var flash = require( 'connect-flash');
var RedisStore = require('connect-redis')(session);


// -----------------------------------------------------------------------------
// app 

var app = module.exports = express();
app.set('views', path.join(__dirname + '/views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// -----------------------------------------------------------------------------
// middleware

// haproxy
app.use(function(req, res, next) {
	if(req.url == '/hacheck') {
		res.send('1');
		return;
	}
	next();
});

// favicon
app.use(favicon(__dirname + '/public/img/favicon.png'));

// static
app.use(compression());
app.use(flash());
// session
app.use(session({ 
    store: new RedisStore({
        host: 'localhost',
        ttl:6373,
		db: 2
    }), 
    secret: '62531dewproiwej32423p4oi2e7ff6e1',
    resave: true,
    saveUninitialized: true
}));
app.use(serveStatic(__dirname + '/public'));

// limit default 100kb
app.use(bodyParser.urlencoded({
	extended: true
}));

// limit default 100kb
app.use(bodyParser.json());

logger.token('body', function (req) {
   return JSON.stringify(req.body);
});

logger.token('cstDate', function () {
     return new Date().toLocaleString();
});

// routes
require('./routes')(app);


// -----------------------------------------------------------------------------
// listen

app.listen(8000);
console.log('blog server started on port:' + 8000);
