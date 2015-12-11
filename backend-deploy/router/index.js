var auth 	= require('./routes/auth');
var post 	= require('./routes/post');
var profile = require('./routes/profile');

module.exports = function (app) {
    app.use(auth.router);
    app.use(post.router);
    app.use(profile.router);
};