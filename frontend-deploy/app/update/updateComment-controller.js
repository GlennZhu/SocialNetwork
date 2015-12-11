(function() {
	'use strict'
	angular
		.module('socialNetwork.controllers')
		.controller('UpdateCommentCtrl', UpdateCommentCtrl)

	UpdateCommentCtrl.$inject = ['$routeParams', 'apiService', '$location']
	function UpdateCommentCtrl($routeParams, apiService, $location) {
		var vm = this
		vm.name = $routeParams.username
		vm.postid = $routeParams.postid
		vm.commentid = $routeParams.commentid

		vm.updateComment = function(newBody) {
			if (newBody) {
		        apiService.putPosts({param: vm.postid, 'commentId': vm.commentid, 'body': newBody}).$promise.then(function(result) {
			      	console.log("update comment succeed")
			    }, function(error) {
			      	console.log('error update comment', error)
			    })
			}
		}

		vm.backToMain = function() {
			$location.path('/main/' + vm.name)
		}
	}
})();