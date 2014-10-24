// So we can use {{T "string"}} in any template
UI.registerHelper('T', function(string, obj) {
	return T(string, obj)
})

/* Translate any string
*
* Arguments (string)
*     Just translates the string
*
* Arguments (string {obj})
*     Translates string and replaces variables with values
*
* Arguments (string {obj: {obj}})
*     When given object inside of object, it takes into account your options.
*     For example you can style a variable string with a class {obj: {str: 'string', cls: 'class-name'}}
*/
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
			if ('object' == typeof obj) {

				// if key doesn't exist, return original
				if (!obj[key])
					return match

				// replace placeholder
				else if ('string' == typeof obj[key])
	    			return obj[key]

	    		// Or take into account extra options
	    		else if ('object' == typeof obj[key]) { // want to style this thing
	    			var str = obj[key]['str']
	    			var cls = obj[key]['cls']
	    			return '<span class="' + cls + '">' + str + '</span>'
				}
			}
			else if ('string' == typeof obj) {
				// if given value is string, use the value itself
				return obj
			}
	    })
	}

	// Return translation
	// SafeString converts HTML tags from actual strings to HTML tags
	return Spacebars.SafeString(value)
}