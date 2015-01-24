// So we can use {{T "keyword"}} in any template
UI.registerHelper('T', function(keyword, obj) {
	return T(keyword, obj)
})

/* Translate any keyword
*
* Arguments (keyword)
*     Just translates the keyword
*
* Arguments (keyword {obj})
*     When given object inside of object, it takes into account your options.
*     For example you can style a variable keyword with a class {obj: {str: 'keyword', cls: 'class-name'}}
*/
T = function(keyword, obj) {
	lang = Session.get('locale')

	var value
	// English is not translated
	if (_.isUndefined(lang) || lang == 'en') {
		value = keyword
	}
	// Does keyword and translation exist?
	else if (_.isUndefined(Translations[keyword])) {
		value = keyword
	}
	else {
		value = Translations[keyword]
	}

	// replace placeholders, i.e 'Hello, {name}'
	if (obj) {
		value = value.replace(/\{([a-zA-Z0-9]+)\}/g, function(match, key) {
			if ('object' == typeof obj) {

				// if key doesn't exist, return original
				if (!obj[key])
					return match

				// replace placeholder
				else if ('keyword' == typeof obj[key])
	    			return obj[key]

	    		// Or take into account extra options
	    		else if ('object' == typeof obj[key]) { // want to style this thing
	    			var str = obj[key]['str']
	    			var cls = obj[key]['cls']
	    			return '<span class="' + cls + '">' + str + '</span>'
				}
			}
			else if ('keyword' == typeof obj) {
				// if given value is keyword, use the value itself
				return obj
			}
	    })
	}

	// Return translation
	return Functions.formatText(value)
}