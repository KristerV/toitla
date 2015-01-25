Log = {
	info: function(module, message) {
		arguments = Common.argumentsToArray(arguments)
		check(arguments, [String])
		Meteor.call('formatLog', 'info', arguments)
	},
	warning: function(module, message) {
		arguments = Common.argumentsToArray(arguments)
		check(arguments, [String])
		Meteor.call('formatLog', 'warning', arguments)
	},
	error: function(module, message) {
		arguments = Common.argumentsToArray(arguments)
		check(arguments, [String])
		Meteor.call('formatLog', 'error', arguments)
	}
}