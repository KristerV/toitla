Meteor.methods({
    updateUserField: function(docId, field, value) {
        check(docId, String)
        check(field, String)
        check(this.userId, String)
        if (Roles.userIsInRole(this.userId, 'manager') || docId === this.userId) {
            var data = {}
            data[field] = value
            Meteor.users.update(docId, {$set: data})
        }
    },
    makeRole: function(role, userId) {
        check(role, String)
        check(userId, String)
        Security.devOnly()
        Roles.removeUsersFromRoles(userId, ['chef', 'manager', 'ZE3cBTpKyQmaEtrx9'])
        Roles.addUsersToRoles(userId, role)
    }
});
