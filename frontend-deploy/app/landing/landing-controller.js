(function() {
	'use strict'
	angular
		.module('socialNetwork.controllers')
		.controller('LandingCtrl', LandingCtrl)

	LandingCtrl.$inject = ['apiService', '$location']
	function LandingCtrl(apiService, $location) {
		var vm = this;

        apiService.getSample().$promise.then(function(result) {
        	console.log(result)
	      	vm.posts = result.posts
	      	vm.posts.map(function(post) {
	      		post["showComment"] = false
	      	})
	    }, function(error) {
	      	console.log('there is an error', error)
	    })

		vm.login = function(inputInvalid, username, password) {
			if (!inputInvalid) {
				apiService.login({'username': username, 'password': password})
			      	.$promise.then(function(result) {
			          	$('#loginModal').modal('hide');
						$('body').removeClass('modal-open');
						$('.modal-backdrop').remove();
			          	$location.path('/main/' + username)
			      	}
			    )
			}
		}
	}
})();