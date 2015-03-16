Template.layout.helpers({
	visible: function(obj){
		if (Session.equals('panel-left', obj.hash.content))
			return "visible"
		else if (Session.equals('panel-right', obj.hash.content))
			return "visible"
	},
	rightPanelActive: function() {
		return Session.get('panel-right')
	},
	transparent: function() {
		if (Session.get('panel-left'))
			return "transparent"
		else if (Session.get('panel-right'))
			return "transparent"
	}
})

Template.layout.events({
	'click .transparent': function(e) {
		
		// post.js has already checked, that the feed is transparent
		Panel.center()
	}
})

Template.layout.rendered = function() {
	Scroller.findPanels()

	// User came here with /post/:id link
	if (Session.get('panel-right-post'))
		Panel.right('postDetails')
	// Default to main panel
	else
		Panel.center()
}

$(window)
	.scroll(function(){
		// Scroller.saveScroll()
	})
	.on("scrollstop", function() {
		// Scroller.doScroll()
	})
	.resize(function(){
		Scroller.findPanels()
		Client.getMenubarWidth()
	})