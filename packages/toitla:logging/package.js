Package.describe({
  name: 'toitla:logging',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('toitla:logging.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('toitla:logging');
  api.addFiles('toitla:logging-tests.js');
});
