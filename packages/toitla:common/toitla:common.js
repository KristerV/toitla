Common = {
	safestring: function(text) {
		if (!text)
			return ""
		// SafeString converts raw HTML tags to actual tags.
		// The replace makes newlines work
		return new Spacebars.SafeString(text.replace(/(\r\n|\n|\r)/gm, '<br>'))
	},
	/*
	* Replaces %s variables in arg1 with arg2, arg3, ...
	* stringf(arg1, arg2, arg3, ...)
	*/
	stringf: function() {
		// var regex = /%(s|d)/g
		// var string = ["üks","kaks","kolm"].pop()
		// console.log(string)

		// string.replace(regex, function)
	}
}