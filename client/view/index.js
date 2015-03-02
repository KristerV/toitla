
// All Sessions used
Session.setDefault('panel-left', null)
Session.setDefault('panel-right', null)
Session.setDefault('menubar-width', 'auto')

// On boot
Meteor.startup(function(){
	
})

// On window resize
window.onresize = function(event) {
    Client.getMenubarWidth()
}