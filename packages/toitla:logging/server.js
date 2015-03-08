Meteor.methods({
	printLog: function(string) {
		check(string, String)
		console.log(string)
	}
})