(function() {
	'use strict'

	angular
		.module('socialNetwork.controllers')
		.directive('myDisplayPost', myDisplayPost)

	myDisplayPost.$inject = ['apiService', '$window', '$location']
	function myDisplayPost(apiService, $window, $location) {
		var controller = function () {
			var vm = this

			vm.comment = function(post, commentator, message, commentInputId) {
				if (message && message.length > 0) {
					if (!post.comments) {
						post.comments = []
					}
				    apiService.putPosts({param: post._id, 'commentId': -1, 'body': message}).$promise.then(function(result) {
				    	var comments = result.posts[0].comments
				    		
						post.comments = comments;	      	
				    }, function(error) {
				      	console.log('comment fail', error)
				    })
				}
			}
			vm.commentButtonText = function () {
				return "Comment"
			}
			vm.toggleCommentArea = function(post) {
				post.showComment = !post.showComment
				var currentText = vm.commentButtonText()
				vm.commentButtonText = function() {
					return currentText === "Comment" ? "Hide" : "Comment"	
				} 
			}
			vm.updatePost = function(postId, myUsername) {
				$location.path('/updatepost/' + myUsername + '/' + postId)
	    	}
	    	vm.openUpdateCommentPage = function(postId, commentId, myUsername) {
	    		$location.path('/updatecomment/' + myUsername + '/' + postId + '/' + commentId)
	    	}
		}

		return {
			restrict: 'EA',
			scope: {
				post: '=postData',
				userData: '=',
				meName: '=',
				postIndex: '='
			},
			controller: controller,
          	controllerAs: 'vm',
			templateUrl: 'app/post/APost.html'
		}
	}
})();
