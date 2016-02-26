Meteor.users._transform = function(doc) {
    doc.__proto__ = User;
    return doc;
}

Meteor.startup(function(){

    if (!Meteor.isServer) return

    Meteor.publish("allUserData", function(){

        if (!this.userId)
            return false

        var fields = {}

        if (Roles.userIsInRole(this.userId, 'manager')) {
            fields = {}
        } else {
            fields['profile.name'] = 1
        }

        return Meteor.users.find({}, {fields: fields});
    });

    Accounts.onCreateUser(function(options, user) {
        user.roles = ['chef']
        var emailHTML = "<p>UUS KASUTAJA</p><p>Email: " + user.emails[0].address + "</p>"
        Meteor.call('sendEmail', null, null, 'Uus kasutaja', emailHTML)
        return user;
    });

});
