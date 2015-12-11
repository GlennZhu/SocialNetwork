var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hash: String    
});

var postSchema = new mongoose.Schema({
    author: String,
    body: String,
    date: Date,
    img: String, 
    comments: [{
        commentId: Number,
        author: String,
        body: String,
        date: Date
    }]
});

var profileSchema = new mongoose.Schema({
    username: String,
    status: String,
    following: [ String ],
    email: String,
    zipcode: String,
    picture: String    
});

exports.User = mongoose.model('users', userSchema);
exports.Post = mongoose.model('post', postSchema);
exports.Profile = mongoose.model('profile', profileSchema);