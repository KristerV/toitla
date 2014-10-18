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
	validateEmail : function(email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	} 
}

