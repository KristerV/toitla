Package.describe({
  name: 'toitla:database',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('toitla:database.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('toitla:database');
  api.addFiles('toitla:database-tests.js');
});
