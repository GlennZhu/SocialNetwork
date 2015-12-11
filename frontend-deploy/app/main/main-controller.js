(function() {
	'use strict'
	angular
		.module('socialNetwork')
		.controller('MainCtrl', MainCtrl)
		.directive('myPopover', myPopover)
	
	MainCtrl.$inject = ['$routeParams', 'apiService', '$location']
	function MainCtrl($routeParams, apiService, $location) {
		var vm = this
		vm.name = $routeParams.username
		vm.userMap = {}
		vm.userMap[vm.name] = {}
		vm.addFollowingPlaceHolder = "add username"

        apiService.getStatus().$promise.then(function(result) {
	      	vm.status = result.statuses[0].status
	      	vm.userMap[vm.name].status = vm.status
	    }, function(error) {
	      	console.log('User not logged in', error)
	      	$location.path('/landing')
	    })

	    apiService.getPicture({param: vm.name}).$promise.then(function(result) {
	      	vm.userMap[vm.name].img = result.picture
	    }, function(error) {
	      	console.log('User not logged in', error)
	      	$location.path('/landing')
	    })

	    apiService.getPosts({param: vm.name}).$promise.then(function(result) {
	      	vm.posts = result.posts
	      	vm.posts.map(function(post) {
	      		post["showComment"] = false
	      		if (!vm.userMap[post.author]) {
		      		apiService.getPicture({param: post.author}).$promise.then(function(result) {
				      	vm.userMap[post.author] = {"img": result.picture}
				    }, function(error) {
				    	console.log('User not logged in', error)
	      				$location.path('/landing')
				    })	
	      		}
			    post.comments.map(function(comment) {
			    	if (!vm.userMap[comment.author]) {
			      		apiService.getPicture({param: comment.author}).$promise.then(function(result) {
					      	vm.userMap[comment.author] = {"img": result.picture}
					    }, function(error) {
					    	console.log('User not logged in', error)
	      					$location.path('/landing')
					    })
			    	}
			    })
	      	})
	    }, function(error) {
	      	console.log('User not logged in', error)
	      	$location.path('/landing')
	    })

	    apiService.getFollowings({param: vm.name}).$promise.then(function(result) {
	    	vm.followingUsers = result.following.map(function(username) {
	    		var tuple =	{
	    			"name": username,
	    			"showDelete": false
	    		}
	    		return tuple
	    	})
	    	result.following.map(function(name) {
	    		if (!vm.userMap[name]) {
	    			vm.userMap[name] = {}
	    		}
	    		if (!vm.userMap[name]['img']) {
		      		apiService.getPicture({param: name}).$promise.then(function(result) {
				      	vm.userMap[name]['img'] = result.picture
				    }, function(error) {
				    	console.log('User not logged in', error)
	      				$location.path('/landing')
				    })	
	    		}
	    		if (!vm.userMap[name]['status']) {
		      		apiService.getStatuses({param: result.following.join()}).$promise.then(function(result) {
		      			result.statuses.map(function(obj) {
		      				vm.userMap[obj.username]['status'] = obj.status
		      			})
				    }, function(error) {
				    	console.log('User not logged in', error)
	      				$location.path('/landing')
				    })
	    		}
	    	})
	    }, function(error) {
	      	console.log('User not logged in', error)
	      	$location.path('/landing')
	    })

		vm.postGenerator = function(name, image, content, date, postId) {
			return {
				_id: postId,
				author: name,
				image: image,
				body: content,
				comments: [],
				date: date,
				showComment: false
			}
		}

		vm.updateStatus = function(status) {
			apiService.updateStatus({"status": status}).$promise.then(function(result) {
		      	vm.status = status
		    }, function(error) {
		    	console.log('Update status failed', error)
		    })	
		}
		
		vm.makePost = function(content, textAreaId) {
			if (content && content.length > 0) {
				apiService.makePost({'body': content, 'img': vm.uploadImage}).$promise.then(function(result) {
					var thisPost = result.posts[0]
			      	var newPost = {
						_id: thisPost._id,
						author: thisPost.author,
						image: thisPost.picture,
						body: thisPost.body,
						comments: [],
						date: thisPost.date,
						showComment: false
					}
			      	
			      	newPost['img'] = thisPost.img
					vm.posts.unshift(newPost)
					vm.uploadImage = null
			    }, function(error) {
			    	console.log('Update status failed', error)
			    })	
			}
		}

		vm.mouseenter = function(user) {
	      	return user.showDelete = true
	    }

	    vm.mouseleave = function(user) {
	    	return user.showDelete = false
	    }

	    vm.delete = function(name) {
	    	for (var i = 0; i < vm.followingUsers.length; i++) {
			    if (vm.followingUsers[i].name === name) {
		      		apiService.deleteFollowing({param: name}).$promise.then(function(result) {
					    vm.followingUsers.splice(i, 1)
				    }, function(error) {
				    	console.log('Add following user fail', error)
	      				$location.path('/landing')
				    })
			    	break
			    }
			}
	    }

	    vm.addFollowedUser = function(name) {
	    	if (!vm.userMap.hasOwnProperty(name)) {
		        apiService.getStatuses({param: name}).$promise.then(function(result) {
		        	if (result.statuses.length > 0) {
		        		var userStatus = result.statuses[0].status

				      	vm.userMap[name] = {}
				      	vm.userMap[name].status = userStatus

	  				    apiService.getPicture({param: name}).$promise.then(function(result) {
					      	vm.userMap[name].img = result.picture

				      		apiService.putFollowing({param: name}).$promise.then(function(result) {
							    vm.followingUsers.push( {
					    			name: name,
					    			showDelete: false
					    		})  	
						    }, function(error) {
						    	console.log('Add following user fail', error)
				  				$location.path('/landing')
						    })
					    }, function(error) {
					      	vm.addFollowingPlaceHolder = "not exist"
					    })
		        	} else {
		        		vm.addFollowingPlaceHolder = "not exist"
		        	}
			    }, function(error) {
			      	vm.addFollowingPlaceHolder = "not exist"
			    })
	    	} else {
	    		apiService.getPicture({param: name}).$promise.then(function(result) {
		      		apiService.putFollowing({param: name}).$promise.then(function(result) {
					    vm.followingUsers.push( {
			    			name: name,
			    			showDelete: false
			    		})  	
				    }, function(error) {
				    	console.log('Add following user fail', error)
		  				$location.path('/landing')
				    })
			    }, function(error) {
			      	vm.addFollowingPlaceHolder = "not exist"
			    })
	    	}
	    }

	    vm.setProfileImage = function(element) {
	    	var file = element.files[0]
	    	
  			apiService.uploadAvatar({ 'img': file }).$promise.then(function(result) {
		      	vm.userMap[vm.name]['img'] = result.picture
		    }, function(error) {
		    	console.log('Upload error', error)
		    })	
	    }

	    vm.setUploadImage = function(element) {
	    	vm.uploadImage = element.files[0]
	    }

	    vm.logout = function() {
  			apiService.logout().$promise.then(function(result) {}, function(error) {
		    	console.log('log out error ', error)
		    })	
	    }
	}

	function myPopover() {
		return function(scope, element, attrs) {
        	element.find("a[rel=popover]").popover()
    	};
	}
})();