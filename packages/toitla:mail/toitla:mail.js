// TODO replace variables in template
// TODO HTML in template
// TODO Log everything
// TODO Mail-send in server
// TODO Write tests

Tmail = {
	send: function(to, subject, body) {
		check([to, subject, body], Match.OneOf(String, [String]))
		Meteor.call('Mail-send', to, subject, body)

	},
	sendBulk: function(to, subject, body) {
		check([to, subject, body], Match.OneOf(String, [String]))

		_.each(to, function(value, key, list) {
			Tmail.send(value, this.subject, this.body)
		}, {subject: subject, body: body})

	},
	sendTemplate: function(to, lang, template, variables) {
		check([to, lang, template], Match.OneOf(String, [String]))
		check(variables, Match.Optional(Object))

		var tmpl = Tmail.getTemplate(template, lang)

		Tmail.send(to, tmpl.subject, tmpl.body)

	},
	sendBulkTemplate: function(to, lang, template, variables) {
		check([to, lang, template], Match.OneOf(String, [String]))
		check(variables, Match.Optional(Object))

		var tmpl = Tmail.getTemplate(template, lang)

		_.each(to, function(value, key, list) {
			Tmail.send(value, tmpl.subject, tmpl.body)
		}, {lang: lang, template: template, variables: variables})

	},
	getTemplate: function(template, lang) {
		if (!TmailTemplates)
			throw new Meteor.Error('Tmail-no-templates-file')
		else if (!TmailTemplates[template])
			throw new Meteor.Error('Tmail-missing-template', 'template: ' + template)
		else if (!TmailTemplates[template][lang])
			throw new Meteor.Error('Tmail-missing-lang', 'template:'+template+', lang:'+lang)
		return TmailTemplates[template][lang]
	}
}