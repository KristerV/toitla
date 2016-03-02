Meteor.methods({
    sendEmail: function (from, to, subject, html, bccFleep) {
        check([from, to], [Match.OneOf(String, null)])
        check([html, subject], [String])
        if (Meteor.userId()) {
            let email = {
                from: from || Settings.system_email,
                subject: subject,
                html: html
            }
            if (to)
                email.to = to
            if (bccFleep)
                email.bcc = Settings.toitla.fleepConvo
            Email.send(email)
        } else {
            throw new Meteor.Error("You're not allowed to send email")
        }

    },
    sendEmailLogin: function (email) {
        email = email.replace(/ /g, '')
        Accounts.sendLoginEmail(email)
    },
    sendDriverLink: function(url, orderId) {
        check([url, orderId], [String])
        if (Roles.isManager(this.userId)) {
            var sett = Settings.findOne('driver').sms
            sett = sett ? sett + ': ' : ''
            var order = Orders.findOne(orderId)
            var date = moment(order.event.fromDate).format('DD.MM.YYYY')
            let html = `<p><b>${date}</b> - ${sett}${url}</p>`
            Meteor.call('sendEmail', null, null, 'driver link', html, true)
        }
    }
});
