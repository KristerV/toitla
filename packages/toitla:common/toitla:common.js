Common = {
	safeString : function(text) {
		if (!text)
			return ""
		// SafeString converts raw HTML tags to actual tags.
		// The replace makes newlines work
		return new Spacebars.SafeString(text.replace(/(\r\n|\n|\r)/gm, '<br>'))
	},
	/*
	* Replaces %s variables in arg1 with arg2, arg3, ...
	* formatString(arg1, arg2, arg3, ...)
	*/
	formatString: function() {

		if (arguments.length <= 0 || !arguments[0])
			return ''
		else if (arguments.length == 1)
			return arguments[0]

		// Change arguments into normal array
		arguments = Common.argumentsToArray(arguments)

		// First item is base string with placeholders
		var string = arguments.shift()

		// If arg* are given in array
		if (arguments.length === 1 && typeof arguments[0] == 'object')
			arguments = arguments[0]

		// Replace placeholders
		string = string.replace(/%(s|d)/g, function(match, key){

			// Are all placeholders covered?
			if (_.isEmpty(this))
				throw new Meteor.Error('formatString-indexOutOfBounds', 'Too few arguments.')

			return this.shift()

		}.bind(arguments))

		// Are all arguments used?
		if (arguments.length !== 0)
			throw new Meteor.Error('formatString-tooManyArguments', 'Too few matches or too many arguments.')

		return string
	},
	argumentsToArray: function(arguments) {
		return Array.prototype.slice.call(arguments);
	}
};

ClientHelper = {
	getFormValues : function(form) {
		if ('string' == typeof form) {
			var values = $('form[name="' + form + '"]').serializeArray();
		}
		else {
			var values = $(form).serializeArray();
		}
		var data = {};
		for (var i = 0; i < values.length; i++) {
			var a = values[i];
			data[a.name] = a.value;
		}
		return data;
	},
};
