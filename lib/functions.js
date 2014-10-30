Functions = {
	validateEmail : function(email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	convertEstonianDateToTimestamp: function(date, time) {
		if (typeof date == 'number')
			return date
		date = date.split('.')
		if (_.isUndefined(time))
			var time = '00:00'
		time = time.split(':')
		date.splice(0, 0, date.splice(1, 1)[0])
		date = moment(new Date(date.join('.')))
		var timestamp = date.add(time[0], 'hours').add(time[1], 'minutes').unix() * 1000
		return timestamp
	}
}