Template.overlay.helpers({
	overlayContent: function() {
		return  Template[Session.get("overlayContent")]
	}
})

Template.overlay.events({
	'click .overlay' : function(e) {
		Global.closeOverlay()
	},
	'click .overlay-content' : function(e) {
		e.stopPropagation()
	}
})

Template.overlay.rendered = function() {}