Package.describe({
  name: 'toitla:images',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2')
  api.use('cfs:graphicsmagick')
  api.use('cfs:gridfs@=0.0.27')
  api.use('cfs:standard-packages')
  api.imply('toitla:posts')
  api.addFiles('images.js')
  api.addFiles('collection.js')
  api.addFiles('server.js', 'server')
  api.addFiles('allow.js', 'server')
  api.addFiles('publish.js', 'server')
  api.export('Images')
})

Package.onTest(function(api) {
  api.use('tinytest')
  api.use('toitla:images')
  api.addFiles('toitla:images-tests.js')
})
