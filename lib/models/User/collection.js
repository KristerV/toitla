Meteor.users._transform = function(doc) {
    doc.__proto__ = User;
    return doc;
}

Meteor.startup(function(){

    if (!Meteor.isServer) return

    Meteor.publish("allUserData", function(){

        var find = {findNothing: true}
        var fields = {}

        if (!this.userId) {
            find = {'profile.image': {$exists: 1}}
            fields = {profile: 1, eligible: 1, roles: 1}
        } else if (Roles.userIsInRole(this.userId, 'manager')) {
            find = {}
            fields = {}
        } else {
            find = {}
            fields['profile.name'] = 1
        }

        return Meteor.users.find(find, {fields: fields});
    });

    Accounts.onCreateUser(function(options, user) {
        user.roles = ['chef']
        var emailHTML = "<p>UUS KASUTAJA</p><p>Email: " + user.emails[0].address + "</p>"
        Meteor.call('sendEmail', null, null, 'Uus kasutaja', emailHTML, true)
        return user;
    });

});
