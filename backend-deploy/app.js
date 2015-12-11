var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
console.log("process.env.NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production") {
    require('dotenv').load() 
}
console.log("process.env is", process.env);

var app = express();
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT, DELETE");
	next();
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/img', express.static(__dirname + '/img')) 

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
     console.log('Server listening at http://%s:%s', 
               server.address().address,
               server.address().port);
})

/**
  * Router
  */
var router = require('./router')(app);

// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app; 