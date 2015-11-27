Meteor.users._transform = function(doc) {
    doc.__proto__ = User;
    return doc;
}

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("allUserData", function(){
            if (this.userId) {
                var fields = {'profile.name': 1}
                if (Roles.userIsInRole(this.userId, 'manager')) {
                    fields = {
                        emails: 1,
                        profile: 1,
                        roles: 1,
                        status: 1,
                        menuCount: 1,
                        eligible: 1,
                        manualRating: 1,
                        acceptanceScore: 1,
                    }
                }
                return Meteor.users.find({}, {fields: fields});
            }
        });
        Accounts.onCreateUser(function(options, user) {
            user.roles = ['chef']
            var emailHTML = "<p> ------------------------------ Uus kasutaja ------------------------------ </p><p>Email: " + user.emails[0].address + "</p>"
            Email.send('teavitus@toitla.com', 'conv.1nho427pw5qh36@fleep.io', 'Teavitus tellimusest', emailHTML)
            return user;
        });
    } else if (Meteor.isClient) {
    }
});
