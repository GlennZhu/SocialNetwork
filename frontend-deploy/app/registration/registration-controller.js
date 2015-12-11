(function() {
	'use strict'
	angular
		.module('socialNetwork')
		.controller('RegistrationCtrl', RegistrationCtrl)
		.directive('confirmPassword', [confirmPassword])

	RegistrationCtrl.$inject = ['apiService', '$location']
	function RegistrationCtrl(apiService, $location) {
		var vm = this;

		vm.clearRegistrationForm = function () {
			document.forms["information"].reset()
		}

		vm.submitInputs = function(username, zipcode, emailaddress, password) {
			console.log(username, zipcode, emailaddress)

	        apiService.register({
	        	'username'	: username,
	        	'email'		: emailaddress,
	        	'zipcode'	: zipcode,
	        	'password'	: password
	        }).$promise.then(function(result) {
		      	console.log(result)
		      	$location.path('/landing')
		    }, function(error) {
		      	console.log('registration fails', error)
		    })
		}

		vm.backToMain = function() {
			$location.path('/landing')
		}
	}

	function confirmPassword() {
	    return {
	      	require: 'ngModel',
	      	link: function (scope, elem, attrs, ctrl) {
		        var firstPassword = '#' + attrs.confirmPassword;
		        elem.add(elem).on('keyup', function () {
		          	scope.$apply(function () {
		            	var v = elem.val()===$(firstPassword).val();
		            	ctrl.$setValidity('pwmatch', v);
		        	});
	        	});
	      	}
	    }
	}
})();