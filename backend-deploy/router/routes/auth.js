var express = require('express');
var router = express.Router();
var md5 = require('md5');
var database = require('../../database.js');

// sessionKey -> userObj
var redis = require('redis').createClient(process.env.REDIS_URL);

var _sessionKeySecretMessage = "This is a secret message";
var _cookieKey = 'sessionIdKey';

router.post('/register', register);
router.post('/login', login);
router.put('/logout', logout);

function isLoggedIn(req, res, next) {
	var requestSessionId = req.cookies[_cookieKey];

	redis.hgetall(requestSessionId, function(err, userObj) {
		if (!requestSessionId || typeof userObj === 'undefined' || !userObj) {
			res.sendStatus(401);
			return;	
		} else {
			req.user = userObj.username;
			next();	
		}
	});
}

function register(req, res) {
	var username = req.body.username;
	var email = req.body.email;
	var zipcode = req.body.zipcode;
	var password = req.body.password;

	if (!username || !email || !zipcode || !password) {
		res.sendStatus(400);
		return;
	}
	var salt = username + new Date().getTime();
	
	var userAuthentication = {
		username: username,
		salt: salt,
		hash: md5(password + salt)
	};
	var userProfile = {
		username: username,
		status: '',
		following: [],
		email: email,
		zipcode: zipcode,
		picture: 'http://draw.academy/forum/uploads/set_resources_2/84c1e40ea0e759e3f1505eb1788ddf3c_default_photo.png'
	};

	var postUserProfilePromise = new Promise(function(resolve, reject) {
		database.postUserProfile(userProfile, function(err, postResult) {
			if (err) {
				console.err("post user profile fail");
		  		reject();
		  	} else {
		  		resolve();	
		  	}
		});	 
	});
	var postUserAuthenticationPromise = new Promise(function(resolve, reject) {
		database.postUserAuthentication(userAuthentication, function(err, postResult) {
			if (err) {
				console.err("post user authentication fail");
		  		reject();
		  	} else {
		  		resolve();
		  	}
		});
	});

	Promise.all([postUserProfilePromise, postUserAuthenticationPromise])
		.then(function() {
		 	res.send({result: "success", username: username});
		})
}

function login(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.sendStatus(400);
		return;
	}

	database.getUserAuthentication(username, function(err, userAuthentications) {
		if (err) {
			console.err("getUserAuthentication fail");
		} else {
			var userObj;

			if (userAuthentications.users.length > 0) {
				userObj = (userAuthentications.users)[0];
			}
			if (!userObj || userObj.hash !== md5(password + userObj.salt)) {
				res.sendStatus(401);
				return;
			}

		    var sessionKey = md5(_sessionKeySecretMessage + new Date().getTime() + username);
		    redis.hmset(sessionKey, ['username', userObj.username, 'salt', userObj.salt, 'hash', userObj.hash]);
		    res.cookie(_cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true});

			var msg = { username: username, result: 'success'};
			res.send(msg);
		}
	})	
}

function logout(req, res) {
	res.clearCookie(_cookieKey);
	res.end();
}

module.exports = {
	router: router,
	isLoggedIn: isLoggedIn
}