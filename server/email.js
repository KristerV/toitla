Meteor.methods({
    sendEmail: function (from, to, subject, html) {
        check([from, to], [Match.OneOf(String, null)])
        check([html, subject], [String])
        if (Meteor.userId()) {
            Email.send({
                from: from || Settings.system_email,
                to: to,
                bcc: Settings.toitla.fleepConvo,
                subject: subject,
                html: html
            })
        } else {
            throw new Meteor.Error("You're not allowed to send email")
        }

    },
    sendEmailLogin: function (email) {
        email = email.replace(/ /g, '')
        Accounts.sendLoginEmail(email)
    }
});
