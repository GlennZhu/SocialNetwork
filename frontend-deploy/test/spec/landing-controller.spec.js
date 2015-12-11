'use strict';
 
describe('LandingCtrl', function(){
    var ctrl, scope
 
    beforeEach(angular.mock.module('socialNetwork'))

    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        ctrl = $controller('LandingCtrl', {$scope: scope});
    }));
    
    it('Input valid scenario should run well', function(){
        ctrl.login(true, "testUsername", "testPassword")
        
    });

    it('Input invalid scenario should run well', function(){
        ctrl.login(false, "testUsername", "testPassword")
    });
});