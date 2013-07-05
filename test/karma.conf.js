// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
  'sinon-1.7.1.js',
  '../build/build.js',
  'tests.js',
  'angular-mocks.js'
];
// enable / disable colors in the output (reporters and logs)
colors = true;
logLevel = LOG_INFO;
autoWatch = true;
browsers = ['PhantomJS'];
// Continuous Integration mode: if true, it capture browsers, run tests and exit
singleRun = true;
