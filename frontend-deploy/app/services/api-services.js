(function() {
	'use strict'
	angular
		.module('socialNetwork')
		.constant('apiURL', 'http://localhost:3000')
		.factory('apiService', apiService)
		
	function apiService($resource, apiURL, $http) {
  		$http.defaults.withCredentials = true
		return $resource(apiURL + '/:endpoint/:param', {param: '@param'}, 
			{
				getSample: 		{ method:'GET' 		, params: {endpoint: 'sample'	} },
				register: 		{ method:'POST'		, params: {endpoint: 'register'	} },
				login    : 		{ method:'POST'		, params: {endpoint: 'login'  	} },
				logout   : 		{ method:'PUT' 		, params: {endpoint: 'logout' 	} },
				getStatus: 		{ method:'GET' 		, params: {endpoint: 'status' 	} },
				getStatuses: 	{ method:'GET' 		, params: {endpoint: 'statuses' } },
				updateStatus: 	{ method:'PUT' 		, params: {endpoint: 'status'	} },
				getPicture: 	{ method:'GET' 		, params: {endpoint: 'picture'	} },
				getPosts:  		{ method:'GET' 		, params: {endpoint: 'posts'  	} },
				putPosts: 		{ method:'PUT' 		, params: {endpoint: 'posts'	} },
				getFollowings:  { method:'GET' 		, params: {endpoint: 'following'} },
				putFollowing: 	{ method:'PUT'		, params: {endpoint: 'following'} },
				deleteFollowing:{ method:'DELETE'	, params: {endpoint: 'following'} },
				getEmail: 		{ method:'GET'		, params: {endpoint: 'email'	} },
				putEmail: 		{ method:'PUT'		, params: {endpoint: 'email'	} },
				getZipcode: 	{ method:'GET'		, params: {endpoint: 'zipcode'	} },
				putZipcode: 	{ method:'PUT'		, params: {endpoint: 'zipcode'	} },
				putPassword: 	{ method:'PUT'		, params: {endpoint: 'password' } },
				uploadAvatar: 	{ 
			        method: 'PUT', 
			        headers: { 'Content-Type': undefined },
			        transformRequest: resourceUploadFile,
			        params: {endpoint: 'picture'}
			    },
			    makePost: 		{
			    	method: 'POST',
			    	headers: { 'Content-Type': undefined },
			        transformRequest: resourceUploadFile,
			        params: {endpoint: 'post'}
			    }
			}
		)
	}

	function resourceUploadFile(data) {
     	var fd = new FormData()  
     	fd.append('image', data.img)
     	fd.append('body', data.body)
    	return fd;
	}
})();