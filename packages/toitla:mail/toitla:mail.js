Tmail = {
	send: function(to, subject, body, lang) {
		check(to, String)
		check(subject, String)
		check(body, String)
		check(lang, String)
		console.log("`````````Tmail.send´´´´´´´´´´´")
		console.log(to)
		console.log(subject)
		console.log(body)
		console.log("´ ´                        ` `")

	},
	sendBulk: function(to, subject, body, lang) {
		check(to, [String])
		check(subject, String)
		check(body, String)
		check(lang, String)

		_.each(to, function(value, key, list) {
			Tmail.send(value, this.subject, this.body, this.lang)
		}, {subject: subject, body: body, lang: lang})

	},
	sendTemplate: function(to, template, variables, lang) {
		check(to, String)
		check(template, String)
		check(variables, Object)
		check(lang, String)

	},
	sendBulkTemplate: function(to, template, variables, lang) {
		check(to, [String])
		check(template, String)
		check(variables, Object)
		check(lang, String)

	},
}