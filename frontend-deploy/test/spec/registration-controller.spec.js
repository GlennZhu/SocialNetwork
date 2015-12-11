'use strict';
 
describe('RegistrationCtrl', function(){
    var ctrl, scope
 
    beforeEach(angular.mock.module('socialNetwork'))

    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        ctrl = $controller('RegistrationCtrl', {$scope: scope});
    }));
    
    it('submit inputs', function(){
        ctrl.submitInputs("testName", 12312, "a@a.a", "asdfa")
    });

    it('go back to main', function(){
        ctrl.backToMain()
    });
});