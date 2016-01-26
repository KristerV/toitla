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
            fields.emails = 1
            fields.profile = 1
            fields.roles = 1
            fields.status = 1
            fields.menuCount = 1
            fields.eligible = 1
            fields.manualRating = 1
            fields.acceptanceScore = 1
        } else {
            fields['profile.name'] = 1
        }

        return Meteor.users.find({}, {fields: fields});
    });

    Accounts.onCreateUser(function(options, user) {
        user.roles = ['chef']
        var emailHTML = "<p>UUS KASUTAJA</p><p>Email: " + user.emails[0].address + "</p>"
        Email.send('teavitus@toitla.com', 'conv.1nho427pw5qh36@fleep.io', 'Uus kasutaja', emailHTML)
        return user;
    });

});
