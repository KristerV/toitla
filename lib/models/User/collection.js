Meteor.users._transform = function(doc) {
    doc.__proto__ = User;
    return doc;
}

Meteor.startup(function(){

    if (!Meteor.isServer) return

    Meteor.publish("allUserData", function(find, options){

        find = find || {}
        options = options || {}

        if (!this.userId) {
            find['profile.image'] = {$exists: 1}
            options.fields = {profile: 1, eligible: 1, roles: 1}
        } else if (Roles.userIsInRole(this.userId, 'manager')) {
        } else {
            options.fields['profile.name'] = 1
        }

        return Meteor.users.find(find, options);
    });

    Accounts.onCreateUser(function(options, user) {
        user.roles = ['chef']
        var emailHTML = "<p>UUS KASUTAJA</p><p>Email: " + user.emails[0].address + "</p>"
        Meteor.call('sendEmail', null, null, 'Uus kasutaja', emailHTML, true)
        return user;
    });

});
