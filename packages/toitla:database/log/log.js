LogCollection = new Meteor.Collection('log')

Meteor.methods({
	saveToLog: function(level, message) {
		check(level, String)
		check(message, Match.OneOf(String, Object))

		// Allow both string and object to be inserted
		var data = _.isObject(message) ? message : {message: message}
		data['level'] = level
		data['date'] = new Date().getTime()

		LogCollection.insert(data)
	},
})