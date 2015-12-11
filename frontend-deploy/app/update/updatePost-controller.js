(function() {
	'use strict'
	angular
		.module('socialNetwork.controllers')
		.controller('UpdatePostCtrl', UpdatePostCtrl)

	UpdatePostCtrl.$inject = ['$routeParams', 'apiService', '$location']
	function UpdatePostCtrl($routeParams, apiService, $location) {
		var vm = this
		vm.name = $routeParams.username
		vm.postid = $routeParams.postid

		vm.updatePost = function(newBody) {
			if (newBody) {
		        apiService.putPosts({param: vm.postid, 'body': newBody}).$promise.then(function(result) {
			      	console.log("update post succeed")
			    }, function(error) {
			      	console.log('error update post', error)
			    })
			}
		}

		vm.backToMain = function() {
			$location.path('/main/' + vm.name)
		}
	}
})();