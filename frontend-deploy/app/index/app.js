(function() {
	'use strict'

	angular
		.module('socialNetwork', ['ngRoute', 'ngResource', 'socialNetwork.controllers'])
		.config(['$routeProvider', function($routeProvider) {
		    $routeProvider.
		      when('/landing', {
		        templateUrl: 'app/landing/landing.html',
		        controller: 'LandingCtrl as vm'
		      }).
		      when('/main/:username', {
		        templateUrl: 'app/main/main.html',
		        controller: 'MainCtrl as vm'
		      }).
		      when('/registration', {
		        templateUrl: 'app/registration/registration.html',
		        controller: 'RegistrationCtrl as vm'
		      }).
		      when('/settings/:username', {
		        templateUrl: 'app/settings/settings.html',
		        controller: 'SettingsCtrl as vm'
		      }).
		      when('/updatepost/:username/:postid', {
		      	templateUrl: 'app/update/updatePost.html',
		        controller: 'UpdatePostCtrl as vm'
		      }).
		      when('/updatecomment/:username/:postid/:commentid', {
		      	templateUrl: 'app/update/updateComment.html',
		        controller: 'UpdateCommentCtrl as vm'
		      }).		      
		      otherwise({
		        redirectTo: '/landing'
		      })
		}])
})()
