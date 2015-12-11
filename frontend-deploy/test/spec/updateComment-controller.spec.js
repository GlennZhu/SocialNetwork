'use strict';
 
describe('UpdateCommentCtrl', function(){
    var ctrl, scope
 
    beforeEach(angular.mock.module('socialNetwork'))

    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        ctrl = $controller('UpdateCommentCtrl', {$scope: scope});
    }));
    
    it('Updates comments', function(){
        ctrl.updateComment("test")
    })

    it('goes back to main', function(){
        ctrl.backToMain()
    })    
});