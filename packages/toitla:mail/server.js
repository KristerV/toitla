Meteor.methods({
	'Mail-send': function(to, subject, body) {
		check(to, String)
		check(subject, String)
		check(body, String)
		console.log("Start sending")
	}
})