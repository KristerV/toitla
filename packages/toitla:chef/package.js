Package.describe({
  name: 'toitla:chef',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('toitla:chef.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('toitla:chef');
  api.addFiles('toitla:chef-tests.js');
});
