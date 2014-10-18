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

Template.overlay.rendered = function() {
	$(document).keydown(function(e) {
		if (e.keyCode == 27) { // escape
			e.preventDefault();
			Global.closeOverlay();
		}
	})
}