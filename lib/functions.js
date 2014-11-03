Functions = {
	validateEmail : function(email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	convertEstonianDateToTimestamp: function(date, time) {

		// Return, if already timestamp
		if (typeof date == 'number')
			return date

		// Reformat date into yyyy-mm-dd
		date = date.split('.')
		date = [date[2], date[1], date[0]]
		date = moment(new Date(date.join('-')))

		// Split time
		if (_.isUndefined(time))
			var time = '00:00'
		time = time.split(':')

		// Combine time and date into timestamp
		var timestamp = date.add(time[0], 'hours').add(time[1], 'minutes').unix() * 1000
		return timestamp
	},
	formatText: function(text) {
		// SafeString converts raw HTML tags to actual tags.
		// The replace makes newlines work
		return new Spacebars.SafeString(text.replace(/(\r\n|\n|\r)/gm, '<br>'))
	}
}