Log = {
	info: function(message) {

		// Identify string with variables
		if (arguments.length > 1 && _.isArray(message))
			message = Common.argumentsToArray(arguments)

		Log.log('info', message)
	},
	warning: function(message) {

		// Identify string with variables
		if (arguments.length > 1 && _.isArray(message))
			message = Common.argumentsToArray(arguments)

		Log.log('warning', message)
	},
	error: function(message) {

		// Identify string with variables
		if (arguments.length > 1 && _.isArray(message))
			message = Common.argumentsToArray(arguments)

		Log.log('error', message)
	},
	log: function(level, message) {
		console.log(message)
		console.log(typeof message)
		check(message, Match.OneOf(String, [String], Object))
		if (typeof message == 'string') {
			Meteor.call('saveToLog', level, message)
		}
		else if (_.isArray(message)) {
			message = Common.formatString(message)
			Meteor.call('saveToLog', level, message)
		}
		else if (_.isObject(message)) {
			Meteor.call('saveToLog', level, message)
		}
	}
}