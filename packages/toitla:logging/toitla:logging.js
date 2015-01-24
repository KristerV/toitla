Log = {
	info: function(file, message) {
		Log.write('info', arguments)
	},
	warning: function(file, message) {
		Log.write('warning', arguments)
	},
	error: function(file, message) {
		Log.write('error', arguments)
	},
	/*
	* Accepts arguments
	* file: what log file to write to
	* message: What message to write
	* arguments: variables to replace in 'message'
	*/
	write: function(level) {

		// First value is level
		arguments.shift()

		// fix array in array: [[val, val, val]]
		if (arguments.length == 1 && typeof arguments[0] == 'object')
			arguments = arguments[0]

		// Fix arguments into real array
		arguments = Common.argumentsToArray(arguments)

		// Replace variabls in message
		var file = arguments.shift()
		var message = arguments.shift()
		message = Common.formatString(message, arguments)

		// Get current time
		var timestamp = TimeSync.serverTime()
		var date = moment(timestamp).format('YYYY-MM-DD HH:mm')

		// Combine message
		message = Common.formatString("%s %s", date, message)

		// Save to database
		Meteor.call('writeLog', level, file, message)
	}
}