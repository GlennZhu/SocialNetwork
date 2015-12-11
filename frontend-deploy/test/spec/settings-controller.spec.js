'use strict';
 
describe('SettingsCtrl', function(){
    var ctrl, scope
 
    beforeEach(angular.mock.module('socialNetwork'))

    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        ctrl = $controller('SettingsCtrl', {$scope: scope});
    }));
    
    it('Updates email', function(){
        ctrl.updateEmail("email")
    })

    it('Updates zip', function(){
        ctrl.updateZipcode(12312)
    })

    it('Updates password', function() {
        ctrl.updatePassword("asdfasd")
    })

    it('goes back to main', function() {
        ctrl.backToMain()
    })
});