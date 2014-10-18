Global = {
	setOverlay : function(template, options) {
		if (_.isUndefined(template))
			return false

		if (!_.isUndefined(options)) {
			if (!_.isUndefined(optins.chefId))
				Session.set("overlayChefId", chefId)
		}

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

