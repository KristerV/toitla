Global = {
	setOverlay : function(template, options) {
		if (_.isUndefined(template))
			return false

		if (!_.isUndefined(options)) {
			if (!_.isUndefined(options.chefId)) {
				Session.set("overlayChefId", options.chefId)
			}
		}

		Session.set("overlayContent", template)
	},
	closeOverlay : function() {
		Session.set("overlayContent", false)
		window.location.hash = ''
	},
	addError : function(elem, errorMessage) {
		Global.removeErrors()
		var err = $('<span class="error">').text(T(errorMessage))
			.insertAfter(elem)
	},
	removeErrors : function() {
		$('span.error').remove()
		$('.error').removeClass('error')
	},
	getFormValues: function(formName) {
		var values = $('form[name="'+formName+'"]').serializeArray()
		var data = {}
		for (var i = 0; i < values.length; i++) {
			var a = values[i]
			data[a.name] = a.value
		};
		return data
	},
	generateKey : function() {
		var key = "";
	    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
	    for (var i = 0; i < 40; ++i)
	    	key += possible.charAt(Math.floor(Math.random() * possible.length));   
	    return key;
	}
}

