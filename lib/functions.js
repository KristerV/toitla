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
	},
	googleAnalytics: function() {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-56769658-1', 'auto');
		ga('send', 'pageview');

		}
}