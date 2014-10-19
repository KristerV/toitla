// So we can use {{T "string"}} in any template
UI.registerHelper('T', function(string) {
	return T(string)
})

// Translate any string
T = function(string, obj) {
	lang = 'et'


	var value
	// English is not translated
	if (_.isUndefined(lang) || lang == 'en')
		value = string
	// Does string and translation exist?
	else if (_.isUndefined(Translations[string])) {
		value = string
	}
	else
		value = Translations[string]

	// replace placeholders
	if (obj) {
		value = value.replace(/\{([a-zA-Z0-9]+)\}/g, function(match, key) { 
    		return key in obj ? obj[key] : match
	    })
	}

	// Return translation
	return value
}