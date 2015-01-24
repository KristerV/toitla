Log = {
	info: function(topic, message) {
		console.log("-------THIS---------")
		console.log(arguments.callee.caller.name)
	},
	warning: function(topic, message) {
	},
	error: function(topic, message) {
	},
	write: function() {

	}
}