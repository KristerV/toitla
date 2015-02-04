LogCollection = new Meteor.Collection('log')

Meteor.methods({
	saveToLog: function(level, message) {
		check(level, String)
		check(message, Match.OneOf(String, [String], Object))

		// Allow both string and object to be inserted
		var data = _.isObject(message) ? message : {message: message}
		data['level'] = level
		data['date'] = new Date()

		LogCollection.insert(data)

	},
})