var express = require('express');
var router = express.Router();
var md5 = require('md5');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 

var upload = require('../../upload.js');
var uploadFile = upload.uploadFile;

var auth = require('./auth.js');
var isLoggedIn = auth.isLoggedIn;

var database = require('../../database.js');

var _samplePosts = require('../../samplePosts.json');

router.get('/sample', getSample);
router.post('/post', isLoggedIn, uploadFile('post'), postPost);
router.get('/posts/:id', isLoggedIn, getPosts);
router.put('/posts/:id', isLoggedIn, putPosts);

function getSample(req, res) {
	res.send(_samplePosts)
}

function postPost(req, res) {
	var username = req.user;
	var imgUrl = req.fileurl;

	var newPostContent = {
        "body": req.body.body,
        "date": Date(),
        "img": imgUrl,
        "comments": [],
        "author": username
	};
	database.postPost(newPostContent, function(err, postResult) {
		if (err) {
	  		return console.error(err);
	  	}
		res.send(postResult);
	});
}

function getPosts(req, res) {
	var username = req.params.id;

	if (!username) {
		res.sendStatus(400);
		return;
	}
	database.getFollowing(username, function(err, getResult) {
		if (err) {
	  		return console.error(err);
	  	}

	  	var following = getResult.following;

	  	if (following.indexOf(username) === -1) {
	  		following.push(username);	
	  	}
	  	database.getPost(following, function(err, getResult) {
		  	if (err) {
		  		return console.error(err);
		  	}
			res.send(getResult);
	  	})
	});
}

function putPosts(req, res) {
	var postId = req.params.id;
	var body = req.body.body;
	var commentId = req.body.commentId;
	var username = req.user;

	if (!commentId) {
		// Update post body
		database.getPostById(postId, function(err, post) {
			if (post.author !== username) {
				res.sendStatus(401);
			} else {
				database.updatePostBody(postId, body, function(err, putResult) {
					if (err) {
				  		return console.error(err);
				  	}
					res.send(putResult);
				});	
			}
		});
	} else if (commentId == -1) {
		// Add a new comment
		database.getPostById(postId, function(err, post) {
			var currentComments = post.comments;

			currentComments.push({
				author: username,
				date: Date(),
				body: body
			});
			database.updateComment(postId, currentComments, function(err, putResult) {
				if (err) {
			  		return console.error(err);
			  	}
				res.send(putResult);
			});
		});
	} else {
		// Update comment body
		database.getPostById(postId, function(err, post) {
			var currentComments = post.comments;
			var filtered = currentComments.filter(function(comment) {
				return comment._id.equals(new ObjectId(commentId));
			});
			var commentToModify;

			if (filtered.length != 1) {
				res.sendStatus(500);
			} else {
				commentToModify = filtered[0];
			}

			if (commentToModify.author !== username) {
				res.sendStatus(401);
			} else {
				commentToModify.body = body;
				database.updateComment(postId, currentComments, function(err, putResult) {
					if (err) {
				  		return console.error(err);
				  	}
					res.send(putResult);
				});
			}
		});
	}
}

module.exports = {
	router: router
}