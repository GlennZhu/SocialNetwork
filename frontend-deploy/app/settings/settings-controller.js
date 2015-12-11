(function() {
	'use strict'
	angular
		.module('socialNetwork.controllers')
		.controller('SettingsCtrl', SettingsCtrl)

	SettingsCtrl.$inject = ['$routeParams', 'apiService', '$location']
	function SettingsCtrl($routeParams, apiService, $location) {
		var vm = this;
		vm.name = $routeParams.username
		vm.passwordPlaceHolder = "password..."

		apiService.getEmail({param: vm.name}).$promise.then(function(result) {
	      	vm.email = result.email
	    }, function(error) {
	      	console.log('Fail getting email', error)
	      	$location.path('/landing')
	    })

	    apiService.getZipcode({param: vm.name}).$promise.then(function(result) {
	      	vm.zipcode = result.zipcode
	    }, function(error) {
	      	console.log('Fail getting email', error)
	      	$location.path('/landing')
	    })

	    vm.updateEmail = function(email) {
	    	apiService.putEmail({'email': email}).$promise.then(function(result) {
		      	vm.email = result.email
		    }, function(error) {
		    	console.log('Upload error', error)
		    	$location.path('/landing')
		    })	
	    }

	    vm.updateZipcode = function(zipcode) {
	    	apiService.putZipcode({'zipcode': zipcode}).$promise.then(function(result) {
		      	vm.zipcode = result.zipcode
		    }, function(error) {
		    	console.log('Upload error', error)
		    	$location.path('/landing')
		    })		
	    }

	    vm.updatePassword = function(password) {
	    	apiService.putPassword({'password': password}).$promise.then(function(result) {
		      	vm.passwordPlaceHolder = result.status
		    }, function(error) {
		    	console.log('Upload error', error)
		    	$location.path('/landing')
		    })
	    }

	    vm.uploadProfileImage = function(element) {
	    	var file = element.files[0]
  			apiService.uploadAvatar({ 'img': file }).$promise.then(function(result) {
		      	console.log('Upload success')
		    }, function(error) {
		    	console.log('Upload error', error)
		    	$location.path('/landing')
		    })	
	    }

	    vm.backToMain = function() {
	    	$location.path('/main/' + vm.name)
	    }
	}
})();