Log = {
	info: function(message) {

		// Identify string with variables
		if (arguments.length > 1)
			message = Common.argumentsToArray(arguments)

		Log.log('info', message)
	},
	warning: function(message) {

		// Identify string with variables
		if (arguments.length > 1)
			message = Common.argumentsToArray(arguments)

		Log.log('warning', message)
	},
	error: function(message) {

		// Identify string with variables
		if (arguments.length > 1)
			message = Common.argumentsToArray(arguments)

		Log.log('error', message)
		var simpleMessage = _.isObject(message) ? message.message : message
		throw new Meteor.Error('Error', simpleMessage)
	},
	log: function(level, message) {
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