Package.describe({
  name: 'toitla:client',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('toitla:client.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('toitla:client');
  api.addFiles('toitla:client-tests.js');
});
