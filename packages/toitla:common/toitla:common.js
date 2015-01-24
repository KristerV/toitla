Common = {
	safeString : function(text) {
		if (!text)
			return "";
			// SafeString converts raw HTML tags to actual tags.
			// The replace makes newlines work
		return new Spacebars.SafeString(text.replace(/(\r\n|\n|\r)/gm, '<br>'));
	}
};

ClientHelper = {
	getFormValues : function(formName) {
		if (formName instanceof jQuery)
			var values = formName.serializeArray();
		else
			var values = $('form[name="' + formName + '"]').serializeArray();
		var data = {};
		for (var i = 0; i < values.length; i++) {
			var a = values[i];
			data[a.name] = a.value;
		}
		return data;
	},
};
