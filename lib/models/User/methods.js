Meteor.methods({
    updateUserField: function(docId, field, value, callback) {
        check(docId, String)
        check(field, String)
        check(this.userId, String)
        if (Roles.userIsInRole(this.userId, 'manager') || docId === this.userId) {
            var data = {}
            data[field] = value
            Meteor.users.update(docId, {$set: data})
            Meteor.call('user.validateEligibility', docId)
        }
    },
    makeRole: function(role, userId) {
        check(role, String)
        check(userId, String)
        if (Meteor.isServer){
            // Security.devOnly()
            // Roles.removeUsersFromRoles(userId, ['chef', 'manager'])
            if (Roles.userIsInRole(this.userId, 'manager'))
                Roles.addUsersToRoles(userId, role)
            else
                throw new Meteor.Error("Only Manager allowed to make someone admin")
        }
    },
    "user.validateEligibility": function(userId) {
        check(userId, String);
        var user = Meteor.users.findOne(userId)
        var p = user.profile
        if (parseInt(p.companyCode) && p.companyName && p.name && p.vet)
            Meteor.users.update(userId, {$set: {eligible: true}})
        else
            Meteor.users.update(userId, {$set: {eligible: false}})
    },
    'Users.deleteUser': function(deleteUserId) {
        check(this.userId, String);
        check(deleteUserId, String);
        if (Roles.userIsInRole(this.userId, 'manager')) {
            Meteor.users.remove(deleteUserId)
            MenuitemTemplates.remove({chefId: deleteUserId})
        }
    }
});
