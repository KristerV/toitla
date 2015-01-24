Common = {
	safestring: function(text) {
		if (!text)
			return ""
		// SafeString converts raw HTML tags to actual tags.
		// The replace makes newlines work
		return new Spacebars.SafeString(text.replace(/(\r\n|\n|\r)/gm, '<br>'))
	}
}