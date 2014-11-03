Functions = {
	validateEmail : function(email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	convertEstonianDateToTimestamp: function(date, time) {

		// Return, if already timestamp
		if (typeof date == 'number')
			return date

		// If no time
		if (_.isUndefined(time))
			var time = '00:00'

		// Reformat date into yyyy-mm-dd hh:mm
		date = date.split('.')
		date = [date[2], date[1], date[0]]
		date = date.join('-') + " " + time
		newDate = new Date(date)
		date = moment(newDate)

		// Combine time and date into timestamp (and convert sec to millisec)
		var timestamp = date.unix() * 1000
		return timestamp
	},
	formatText: function(text) {
		// SafeString converts raw HTML tags to actual tags.
		// The replace makes newlines work
		return new Spacebars.SafeString(text.replace(/(\r\n|\n|\r)/gm, '<br>'))
	}
}