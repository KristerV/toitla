// So we can use {{T "string"}} in any template
UI.registerHelper('T', function(string, obj) {
	return T(string, obj)
})

// Translate any string
T = function(string, obj) {
	lang = 'et'


	var value
	// English is not translated
	if (_.isUndefined(lang) || lang == 'en') {
		value = string
	}
	// Does string and translation exist?
	else if (_.isUndefined(Translations[string])) {
		value = string
	}
	else {
		value = Translations[string]
	}

	// replace placeholders, i.e 'Hello, {name}'
	if (obj) {
		value = value.replace(/\{([a-zA-Z0-9]+)\}/g, function(match, key) {
			if ('object' == typeof obj)
				// replace placeholder if key is found in obj
	    		return key in obj ? obj[key] : match
			else {
				// if given value is other than object, use the value itself
				return obj
			}
	    })
	}

	// Return translation
	return value
}