exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/protractor-test/spec.js'],
    onPrepare: function() {
        var jr = require('jasmine-reporters')
        jasmine.getEnv().addReporter(new jr.JUnitXmlReporter({
             savePath: 'e2e-results'
        }))
        jasmine.getEnv().addReporter(new jr.TapReporter())
    }
}
