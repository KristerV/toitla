
// All Sessions used
Session.setDefault('panel-left', 'postNew')
Session.setDefault('panel-right', 'postDetails')
Session.setDefault('menubar-width', 'auto')

// On boot
Meteor.startup(function(){
	
})

// On window resize
window.onresize = function(event) {
    Client.getMenubarWidth()
}