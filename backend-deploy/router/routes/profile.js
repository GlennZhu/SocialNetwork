var express = require('express');
var router = express.Router();

var database = require('../../database.js');
var upload = require('../../upload.js');
var uploadFile = upload.uploadFile;

var auth = require('./auth.js');
var isLoggedIn = auth.isLoggedIn;

router.get('/picture/:user', getPicture);

router.get('/status', isLoggedIn, getStatus);
router.put('/status', isLoggedIn, putStatus);

router.get('/statuses/:users', getStatuses);

router.get('/following/:user', isLoggedIn, getFollowing);
router.put('/following/:user', isLoggedIn, putFollowing);
router.delete('/following/:user', isLoggedIn, deleteFollowing);

router.get('/email/:user', getEmail);
router.put('/email', isLoggedIn, putEmail);

router.get('/zipcode/:user', getZipcode);
router.put('/zipcode', isLoggedIn, putZipcode);

router.put('/password', isLoggedIn, putPassword);

router.put('/picture', isLoggedIn, uploadFile('avatar'), putPicture);

function getPicture(req, res) {
	var username = req.params.user;

	database.getPicture(username, function(err, getResult) {
		if (err) {
	  		return console.error(err);
	  	}
		res.send(getResult);
	});
}

function getStatus(req, res) {
	var username = req.user;

	database.getStatus(username, function(err, getResult) {
		if (err) {
	  		return console.error(err);
	  	}
	  	res.send(getResult);
	});
}

function putStatus(req, res) {
	var username = req.user;
	var status = req.body.status;

	database.putStatus(username, status, function(err, putResult) {
		if (err) {
	  		return console.error(err);
	  	}
	  	res.send(putResult);
	});
}

function getStatuses(req, res) {
	var usernames = req.params.users.split(',');

	database.getStatuses(usernames, function(err, getResult) {
		if (err) {
	  		return console.error(err);
	  	}
	  	res.send(getResult);
	});
}

function getFollowing(req, res) {
	var username = req.user;

	database.getFollowing(username, function(err, getResult) {
		if (err) {
	  		return console.error(err);
	  	}
	  	res.send(getResult);
	});
}

function putFollowing(req, res) {
	var myUsername = req.user;
	var followUsername = req.params.user;

	database.putFollowing(myUsername, followUsername, function(err, putResult) {
		if (err) {
	  		return console.error(err);
	  	}
	  	res.send(putResult);
	});
}

function deleteFollowing(req, res) {
	var myUsername = req.user;
	var followUsername = req.params.user;

	database.deleteFollowing(myUsername, followUsername, function(err, deleteResult) {
		if (err) {
	  		return console.error(err);
	  	}
	  	res.send(deleteResult);
	});
}

function getEmail(req, res) {
	var username = req.params.user;

	database.getEmail(username, function(err, getResult) {
		if (err) {
	  		return console.error(err);
	  	}
	  	res.send(getResult);
	});
}

function putEmail(req, res) {
	var username = req.user;
	var newEmail = req.body.email;

	database.putEmail(username, newEmail, function(err, putResult) {
		if (err) {
	  		return console.error(err);
	  	}
	  	res.send(putResult);
	});
}

function getZipcode(req, res) {
	var username = req.params.user;

	database.getZipcode(username, function(err, getResult) {
		if (err) {
	  		return console.error(err);
	  	}
	  	res.send(getResult);
	});
}

function putZipcode(req, res) {
	var username = req.user;
	var newZipcode = req.body.zipcode;

	database.putZipcode(username, newZipcode, function(err, putResult) {
		if (err) {
	  		return console.error(err);
	  	}
	  	res.send(putResult);
	});
}

function putPassword(req, res) {
	var username = req.user;
	var newPassword = req.body.password;
	
	database.putPassword(username, newPassword, function(err, putResult) {
		if (err) {
	  		return console.error(err);
	  	}
	  	res.send(putResult);
	});
}

function putPicture(req, res) {
	var username = req.user;
	var newUrl = req.fileurl;

	database.putPicture(username, newUrl, function(err, putResult) {
		if (err) {
	  		return console.error(err);
	  	}
	  	res.send(putResult);
	});
}

module.exports = {
	router: router
}