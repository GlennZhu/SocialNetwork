'use strict';
 
describe('MainCtrl', function(){
    var ctrl, scope
 
    beforeEach(angular.mock.module('socialNetwork'))

    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new()
        //declare the controller and inject our empty scope
        ctrl = $controller('MainCtrl', {$scope: scope})
    }))
    
    it('Post generator works', function(){
        var generatedPost = ctrl.postGenerator("testName", null, "testContent", "testDate")
        expect(generatedPost.author).toBe("testName")
        expect(generatedPost.image).toBe(null)
        expect(generatedPost.body).toBe("testContent")
    })

    it('Update status updates status', function(){
        ctrl.updateStatus("test status")
    })

    it('makes post', function() {
    	ctrl.makePost("test content", 13)
    })

    it('does not make post', function() {
    	ctrl.makePost(null, 13)
    })

    it('mouseenter works', function() {
    	var testUser = {showDelete: false}
    	ctrl.mouseenter(testUser)
    	expect(testUser.showDelete).toBe(true)
    })

    it('mouseleave works', function() {
    	var testUser = {showDelete: true}
    	ctrl.mouseleave(testUser)
    	expect(testUser.showDelete).toBe(false)
    })

    it('deletes', function() {
    	ctrl.followingUsers = []
    	ctrl.delete("test")
    })

    it('sets upload image', function() {
    	var element = {files: []}
    	ctrl.setUploadImage(element)
    })
})