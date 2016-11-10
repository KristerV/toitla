Accounts.sendLoginEmail = function (address) {

    if (!address) {
        throw new Meteor.Error("No email provided")
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(address)) {
        throw new Meteor.Error("Provided string is not an email")
    }

    var user = Accounts.findUserByEmail(address);

    if (!user) {
        Accounts.createUser({email: address});
        user = Accounts.findUserByEmail(address);
    }

    var tokenRecord = Accounts._generateStampedLoginToken();
    Accounts._insertLoginToken(user._id, tokenRecord);

    var loginUrl = Meteor.absoluteUrl('login/' + tokenRecord.token);

    var html = '<!DOCTYPE>' +
               '<html>' +
               '<head>' +
                   '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
               '</head>' +
               '<body>';

    if (user.profile) {
        html += '<p>Tere ' + user.profile.name + ',</p>';
        html += "<p>Toitla keskkonda sisselogimiseks kliki allolevale lingile: </p>";
    } else {
        html += '<p>Tere, hea huviline!</p>';
        html += "<p>Tahad liituda Toitla kokkade tegusa kogukonnaga? Väga vahva! Algus on tehtud.</p>";
        html += "<p>Toitla keskkonda sisselogimiseks kliki allolevale lingile: </p>";
    }

    html += '<p><a target="_blank" href="' + loginUrl + '">' + loginUrl + '</a></p>';

    if (!user.profile) {
        html += '<p>Meie foorumist saad abi edasiste sammude tegemiseks. Foorumi lingi leiad Toitla lehe ülevalt servast või külasta <a target="_blank" href="spice.toitla.com">spice.toitla.com</a> (pead olema eelnevalt Toitla lehele sisse loginud).</p>';
    }

    html += '<p>Kohtumiseni!<br>Toitla kirjatuvi</p>';
    html += '</body>' +
            '</html>';

    Email.send({
        from: Settings.system_email,
        to: address,
        subject: 'Toitla ligipääs',
        html: html
    })
};
