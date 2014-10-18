// So we can use {{T "string"}} in any template
UI.registerHelper('T', function(string) {
	return T(string)
})

// Translate any string
T = function(string) {
	lang = 'et'


	// English is not translated
	if (_.isUndefined(lang) || lang == 'en')
		return string

	// Does string and translation exist?
	if (_.isUndefined(Translations[string]))
		return string

	// Return translation
	return Translations[string]
}