var md5 = require('md5');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);
console.log("Database connecting to", process.env.MONGOLAB_URI);

var ObjectId = mongoose.Types.ObjectId; 

var model = require('./model.js');
var Post = model.Post;
var Profile = model.Profile;
var User = model.User;

function postPost(newPostContent, callback) {
	var newPost = new Post(newPostContent);

  	newPost.save(function(err, post) {
	  	callback(err, { posts: [post] });
	});
}
exports.postPost = postPost;

function getPost(usernames, callback) {
	var conditions = usernames.map(function(username) {
		return {author: username};
	});

	Post
	.find({ $or: conditions })
	.sort('-date')
	.limit(10)
	.exec(function(err, posts) {
	  	callback(err, { posts: posts });
	});
}
exports.getPost = getPost;

function postUserProfile(userProfile, callback) {
	var newProfile = new Profile(userProfile);

	newProfile.save(function(err, profile) {
		callback(err, { profile: profile });
	});
}
exports.postUserProfile = postUserProfile;

function postUserAuthentication(userAuthentication, callback) {
	var newUser = new User(userAuthentication);

	newUser.save(function(err, user) {
		callback(err, { user: user });
	});
}
exports.postUserAuthentication = postUserAuthentication;

function getUserAuthentication(username, callback) {
	User.find({username: username}, function(err, users) {
		callback(err, {users: users});
	});
}
exports.getUserAuthentication = getUserAuthentication;

function getPicture(username, callback) {
	Profile.find({ username: username }, function(err, profiles) {
		if (profiles.length == 0) {
			callback(err, { username: username, picture: null });
		} else {
			var thisProfile = profiles[0];
			callback(err, { username: thisProfile.username, picture: thisProfile.picture });
		}
	});
}
exports.getPicture = getPicture;

function getStatus(username, callback) {
	Profile.find({ username: username}, function(err, profiles) {
		if (profiles.length == 0) {
			callback(err, { statuses: [{username: username, status: "status not found"}] } );
		} else {
			var thisProfile = profiles[0];
			callback(err, { statuses: [{username: thisProfile.username, status: thisProfile.status }] } );
		}
	})
}
exports.getStatus = getStatus;

function putStatus(username, status, callback) {
	Profile.findOneAndUpdate( {username: username} , {status: status}, {new: true}, function(err, newProfile){
		callback(err, {username: username, status: newProfile.status});
	});
}
exports.putStatus = putStatus;

function getStatuses(usernames, callback) {
	var conditions = usernames.map(function(username) {
		return {username: username};
	});
	Profile.find({ $or: conditions }, function(err, profiles) {
		var statuses = profiles.map(function(profile) {
			return { username: profile.username, status: profile.status };
		})
		callback(err, { statuses: statuses })
	});
}
exports.getStatuses = getStatuses;

function getFollowing(username, callback) {
	Profile.find({ username: username }, function(err, profiles) {
		if (profiles.length == 0) {
			callback(err, { username: username, following: [] });
		} else {
			var thisProfile = profiles[0];
			callback(err, { username: thisProfile.username, following: thisProfile.following });
		}
	});
}
exports.getFollowing = getFollowing;

function putFollowing(myUsername, followUsername, callback) {
	getFollowing(myUsername, function(err, getResult) {
		var currentFollowing = getResult.following;
		
		currentFollowing.push(followUsername);
		Profile.findOneAndUpdate( {username: myUsername}, {following: currentFollowing}, {new: true}, function(err, newProfile) {
			callback(err, { username: newProfile.username, following: newProfile.following });
		});
	});
}
exports.putFollowing = putFollowing;

function deleteFollowing(myUsername, followUsername, callback) {
	getFollowing(myUsername, function(err, getResult) {
		var currentFollowing = getResult.following;
		var indexToRemove = currentFollowing.indexOf(followUsername);

		if (indexToRemove > -1) {
			currentFollowing.splice(indexToRemove, 1);
		}
		Profile.findOneAndUpdate( {username: myUsername}, {following: currentFollowing}, {new: true}, function(err, newProfile) {
			callback(err, { username: newProfile.username, following: newProfile.following });
		});
	});	
}
exports.deleteFollowing = deleteFollowing;

function getEmail(username, callback) {
	Profile.find({ username: username }, function(err, profiles) {
		if (profiles.length == 0) {
			callback(err, { username: username, email: "Not Found"});
		} else {
			var thisProfile = profiles[0];
			callback(err, { username: thisProfile.username, email: thisProfile.email });
		}
	})
}
exports.getEmail = getEmail;

function putEmail(username, newEmail, callback) {
	Profile.findOneAndUpdate( {username: username}, {email: newEmail}, {new: true}, function(err, newProfile) {
		callback(err, { username: newProfile.username, email: newProfile.email });
	});
}
exports.putEmail = putEmail;

function getZipcode(username, callback) {
	Profile.find({ username: username }, function(err, profiles) {
		if (profiles.length == 0) {
			callback(err, { username: username, zipcode: "Not Found"});
		} else {
			var thisProfile = profiles[0];
			callback(err, { username: thisProfile.username, zipcode: thisProfile.zipcode });
		}
	})
}
exports.getZipcode = getZipcode;

function putZipcode(username, newZipcode, callback) {
	Profile.findOneAndUpdate( {username: username}, {zipcode: newZipcode}, {new: true}, function(err, newProfile) {
		callback(err, { username: newProfile.username, zipcode: newProfile.zipcode });
	});
}
exports.putZipcode = putZipcode;

function putPassword(username, newPassword, callback) {
	var newSalt = username + new Date().getTime();
	var newHash = md5(newPassword + newSalt);

	User.findOneAndUpdate( {username: username}, {salt: newSalt, hash: newHash}, {new: true}, function(err, newUser) {
		if (!newUser) {
			callback(err, { username: newUser.username, status: "Fail"})	
		} else {
			callback(err, { username: newUser.username, status: "Successful"})	
		}
	});
}
exports.putPassword = putPassword;

function putPicture(username, newUrl, callback) {
	Profile.findOneAndUpdate({ username: username}, {picture: newUrl}, {new: true}, function(err, newProfile) {
		callback(err, { username: newProfile.username, picture: newProfile.picture });
	});
}
exports.putPicture = putPicture;

function updatePostBody(postId, newBody, callback) {
	Post.findOneAndUpdate({_id: new ObjectId(postId)}, {body: newBody}, {new: true}, function(err, newPost) {
		callback(err, { posts: [newPost] });
	});
}
exports.updatePostBody = updatePostBody;

function getPostById(postId, callback) {
	Post.findById(new ObjectId(postId), function(err, post) {
		callback(err, post);
	});
}
exports.getPostById = getPostById;

function updateComment(postId, updateComments, callback) {
	Post.findOneAndUpdate({_id: new ObjectId(postId)}, {comments: updateComments}, {new: true}, function(err, newPost) {
		callback(err, { posts: [newPost] });
	});
}
exports.updateComment = updateComment;