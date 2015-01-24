Package.describe({
  name: 'toitla:chat',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('toitla:chat.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('toitla:chat');
  api.addFiles('toitla:chat-tests.js');
});
