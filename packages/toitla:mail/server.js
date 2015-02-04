Meteor.methods({
	'Mail-send': function(to, subject, body, from) {

		// If no from email, add default
		if (!from)
			from = Configuration.email

		// Validate input
		check([from, to, subject, body], [String])

		// Save event to log
		Log.info({
			type: 'email',
			from: from,
			to: to,
			subject: subject,
			body: body,
		})

		// Use Mailgun API
		if (process.env.MAILGUN_API_URL && process.env.MAILGUN_DOMAIN) {
			Meteor.http.post(process.env.MAILGUN_API_URL + '/' + process.env.MAILGUN_DOMAIN + '/messages', 
				{
					auth:"api:" + process.env.MAILGUN_API_KEY,
					params: 
					{
						"from": from,
						"to": to,
						"subject": subject,
						"html": body,
					}
				},
				function(error, result) {
					if(error){
						Log.error('Mail-send-error: '+error)
					} else {
						console.log(result) //TODO test in live, does logging this make sense?
						Log.info(result)
					}
				}
			)
		} else {
			Log.error({
				type: 'email',
				message: 'Mailgun environment variables not configured.',
			})
		}
	}
})