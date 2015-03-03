
// All Sessions used
Session.setDefault('panel-left', null)
Session.setDefault('panel-right', null)
Session.setDefault('menubar-width', '10%')

// On boot
Meteor.startup(function(){
	
})

// On window resize
window.onresize = function(event) {
    Client.getMenubarWidth()
    Scroller.goToPanel(1, true)
}