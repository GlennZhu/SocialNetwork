describe('Social Network App', function() {

  var baseUrl = 'http://localhost:8000/#/'
  var testUsername = "zz23test"
  var testPassword = "unit-return-riding"
  var EC = protractor.ExpectedConditions

  beforeEach(function() {
    browser.get('http://localhost:8000/')
  })

  it('can register new user', function() {
    var signupButton = element(by.id('signupButton'))
    var username = element(by.model('usernameModel'))  
    var zipcode = element(by.model('zipcodeModel'))
    var email = element(by.model('emailModel'))
    var password = element(by.model('passwordModel'))
    var passwordConfirmation = element(by.model('passwordConfirmationModel'))
    var submitButton = element(by.id('submitButton'))

    signupButton.click()
    browser.wait(EC.visibilityOf(username), 10000);
    username.sendKeys('usernameTest')
    zipcode.sendKeys('12312')
    email.sendKeys('test@test.com')
    password.sendKeys('123123')
    passwordConfirmation.sendKeys('123123')
    submitButton.click()

    expect(browser.getCurrentUrl()).toEqual(baseUrl + 'landing')

    // expect(username.getAttribute('value')).toEqual('usernameTest')  
  })

  it('shows 12 posts for non-login users', function() {
    var posts = element.all(by.repeater('post in vm.posts'));
    posts.count().then(function(result) {
      expect(result).toEqual(12)  
    })
  })

  describe('Logg in', function() {

    beforeEach(function() {
      var loginButton = element(by.id('loginButton'))
      var usernameInput = element(by.model('usernameModel'))
      var passwordInput = element(by.model('passwordModel'))
      var submitButton = element(by.id('submitButton'))

      loginButton.click()
      browser.wait(EC.visibilityOf(usernameInput), 10000);
      usernameInput.sendKeys(testUsername)
      passwordInput.sendKeys(testPassword)
      submitButton.click()
    })

    it('logs in as the test user', function() {
      expect(browser.getCurrentUrl()).toEqual(baseUrl + 'main/' + testUsername)
    })

    it('creates a post', function() {
      var postTextarea = element(by.id('postTextarea'))
      var testPostBody = "test post"
      var postButton = element(by.id('postButton'))

      browser.wait(EC.visibilityOf(postTextarea), 10000);
      postTextarea.sendKeys(testPostBody)
      postButton.click()
      element.all(by.repeater('post in vm.posts')).then(function(posts) {
         var textElement = posts[0].element(by.className('card-text'));
         expect(textElement.getText()).toContain(testPostBody);
      })
    })

    it('updates status', function() {
      var testStatus = "test status " + Date.now()
      var statusInput = element(by.model('statusInputModel'))
      var updateStatusButton = element(by.id('updateStatusButton'))

      browser.wait(EC.visibilityOf(statusInput), 10000)
      statusInput.sendKeys(testStatus)
      updateStatusButton.click()
      expect(statusInput.getAttribute('value')).toEqual(testStatus)
    })

    it('adds followed user', function() {
      var followedUserInput = element(by.model('addFollowedUserInputModel'))
      var followedUser = "zz23"
      var addFollowedUserButton = element(by.id('addFollowedUserButton'))
      var previousCount, newCount
      var followedUsers = element.all(by.repeater('user in vm.followingUsers'))

      browser.wait(EC.visibilityOf(followedUserInput))
      followedUsers.count().then(function(prevC) {
        followedUserInput.sendKeys(followedUser)
        addFollowedUserButton.click()
        newCount = followedUsers.count().then(function(newC) {
          expect(prevC + 1).toEqual(newC)
        })
      })
    })

    it('removes followed user', function() {
      var previousCount, newCount
      var deleteButton = element.all(by.id("deleteFollowedUser"))
      var followedUsers = element.all(by.repeater('user in vm.followingUsers'))

      // browser.wait(EC.visibilityOf(deleteButton.get(0)))
      followedUsers.count().then(function(prevC) {
        if (prevC > 0) {
 
        }
      })
    })

    it('can search for a specific post', function() {
      var searchInput = element(by.model("searchText"))
      var searchAuthor = "zz23test"

      browser.wait(EC.visibilityOf(searchInput))
      searchInput.sendKeys(searchAuthor)
      element.all(by.repeater('post in vm.posts')).then(function(posts) {
          var textElement = posts[0].element(by.className('card-text'))
          expect(textElement.getText()).toContain(searchAuthor)
      })
    })

    it('updates user email', function() {
      var settingsButton = element(by.id('settingsButton'))
      var emailInput = element(by.model('emailInputModel'))
      var testEmail = Date.now() + "@test.com"
      var updateEmailButton = element(by.id('updateEmailButton'))

      browser.wait(EC.visibilityOf(settingsButton))
      settingsButton.click()
      browser.wait(EC.visibilityOf(emailInput))
      emailInput.sendKeys(testEmail)
      updateEmailButton.click()
      expect(emailInput.getAttribute('placeholder')).toEqual(testEmail)
    })

    it('updates user zipcode', function() {
      var settingsButton = element(by.id('settingsButton'))
      var zipcodeInput = element(by.model('zipInputModel'))
      var testZipcode = Date.now()
      var updateZipcodeButton = element(by.id('updateZipcodeButton'))

      browser.wait(EC.visibilityOf(settingsButton))
      settingsButton.click()
      browser.wait(EC.visibilityOf(zipcodeInput))
      zipcodeInput.sendKeys(testZipcode)
      updateZipcodeButton.click()
      expect(zipcodeInput.getAttribute('placeholder')).toEqual(testZipcode + "")
    })

    it('updates user password', function() {
      var settingsButton = element(by.id('settingsButton'))
      var passwordInput = element(by.model('passwordInputModel'))
      var updatePasswordButton = element(by.id('updatePasswordButton'))
      var newPassword = "abc"

      browser.wait(EC.visibilityOf(settingsButton))
      settingsButton.click()
      browser.wait(EC.visibilityOf(passwordInput))
      passwordInput.sendKeys(newPassword)
      updatePasswordButton.click()
      expect(passwordInput.getAttribute('placeholder')).toEqual("will not change")
    })
  })
})
