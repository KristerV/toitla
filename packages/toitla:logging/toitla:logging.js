Log = {
	info: function(message) {
		if (arguments.length == 1 && !_.isArray(message))
			Log.log('info', message)
		else
			Log.log('info', Common.argumentsToArray(arguments)) // string has variables
	},
	warning: function(message) {
		if (arguments.length == 1 && !_.isArray(message))
			Log.log('warning', message)
		else
			Log.log('warning', Common.argumentsToArray(arguments)) // string has variables
	},
	error: function(message) {
		if (arguments.length == 1 && !_.isArray(message))
			Log.log('error', message)
		else
			Log.log('error', Common.argumentsToArray(arguments)) // string has variables
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