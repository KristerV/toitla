Package.describe({
  name: 'toitla:date',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('toitla:date.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('toitla:date');
  api.addFiles('toitla:date-tests.js');
});
