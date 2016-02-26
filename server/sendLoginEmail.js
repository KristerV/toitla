Accounts.sendLoginEmail = function (address) {

    if (!address) {
        throw new Meteor.Error("No email provided")
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(address)) {
        throw new Meteor.Error("Provided string is not an email")
    }

    var user = Accounts.findUserByEmail(address)

    if (!user) {
        Accounts.createUser({email: address})
        user = Accounts.findUserByEmail(address)
    }

    var tokenRecord = Accounts._generateStampedLoginToken()
    Accounts._insertLoginToken(user._id, tokenRecord);

    var loginUrl = Meteor.absoluteUrl('login/' + tokenRecord.token)
    console.info(loginUrl);

    var html = ''
    if (user.profile) {
        html += '<p>Hey ' + user.profile.name + ',</p>'
        html += "<p>To login, just follow this link.</p>"
    }
    else {
        html += '<p>Hey there,</p>'
        html += "<p>To register, just follow this link. A user wil be created for you.</p>"
    }

    html += '<p><a target="_blank" href="' + loginUrl + '">' + loginUrl + '</a></p>'

    html += '<p>All the best, Toitla</p>'

    Meteor.call('sendEmail', null, address, 'Toitla login link', html)
};
