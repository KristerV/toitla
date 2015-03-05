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

	var translation
	lang = Session.get('locale') ? Session.get('locale') : 'en'

	// Does translation exist?
	if (_.isUndefined(keyword))
		throw new Meteor.Error('translation-keyword-missing', 'Translation keyword not supplied.')
	if (_.isUndefined(Translations[keyword]))
		throw new Meteor.Error('translation-missing', 'Translation missing: keyword: '+keyword)
	if (_.isUndefined(Translations[keyword][lang]))
		throw new Meteor.Error('translation-missing-language', 'Translation missing: lang: '+lang+', keyword: '+keyword)

	// Translate
	translation = Translations[keyword][lang]

	// replace placeholders, i.i. "Hello, {name}"
	var regex = /\{([a-zA-Z0-9]+)\}/g
	if (translation.match(regex)) {

		// Basic error detection
		if (!obj)
			throw new Meteor.Error("translator-obj-missing")
		else if (typeof obj != 'object')
			throw new Meteor.Error("translator-obj-error")

		// Replace
		translation = translation.replace(regex, function(match, key) {

			// Basic error detection
			if (!obj[key])
				throw new Meteor.Error('translator-no-matching-key', 'Missing key: '+key)
			else if (typeof obj[key] != 'string')
				throw new Meteor.Error('translator-matching-key-error', 'Error key: '+key)

			// Return replacement
			return obj[key]
		})
	}

	// Return translation
	return Common.safeString(translation)
}