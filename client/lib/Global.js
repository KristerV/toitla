Global = {
	setOverlay : function(template) {
		Session.set("overlayContent", template)
	},
	closeOverlay : function() {
		Session.set("overlayContent", false)
		window.location.hash = ''
	},
	addError : function(elem, errorMessage) {
		var err = $('<span class="error">').text(T(errorMessage))
			.insertAfter(elem)
	},
	removeErrors : function() {
		$('span.error').remove()
		$('.error').removeClass('error')
	}
}

