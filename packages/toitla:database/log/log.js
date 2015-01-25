LogCollection = new Meteor.Collection('log')

Meteor.methods({
	/*
	* Accepts arguments
	* 
	module: what log module is logging
	* message: What message to write
	* arguments: variables to replace in 'message'
	*/
	formatLog: function(level) {
		if (!level)
			return false
		check(level, String)
		check(arguments, [Match.OneOf(String, [String])])

		// Fix arguments into real array
		arguments = Common.argumentsToArray(arguments)

		// First value is level
		arguments.shift()

		// fix array in array: [[val, val, val]]
		if (arguments.length == 1 && typeof arguments[0] == 'object')
			arguments = arguments[0]

		// Replace variabls in message
		var module = arguments.shift()
		var message = arguments.shift()
		if (!!message && arguments.length >= 1)
			message = Common.formatString(message, arguments)

		// Save to database
		check(module, Match.OneOf(String, undefined))
		check(level, Match.OneOf(String, undefined))
		check(message, Match.OneOf(String, undefined))
		Meteor.call('saveToLog', module, level, message)
	},
	saveToLog: function(type, level, message) {
		check(type, Match.OneOf(String, undefined))
		check(level, Match.OneOf(String, undefined))
		check(message, Match.OneOf(String, undefined))

		LogCollection.insert({
			type: type, 
			level: level, 
			message: message,
			date: new Date().getTime()
		})
	},
})