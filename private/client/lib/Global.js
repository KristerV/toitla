Global = {
	setOverlay : function(template, options) {
		if (_.isUndefined(template))
			return false

		if (!_.isUndefined(options) && typeof options == 'object') {
			Session.set('overlayOptions', options)
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
		err.velocity({ opacity: 0 }, { duration: 10000, display: "none" })

	},
	removeErrors : function() {
		$('span.error').remove()
		$('.error').removeClass('error')
	},
	getFormValues: function(formName) {
		if (formName instanceof jQuery)
			var values = formName.serializeArray()
		else
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
