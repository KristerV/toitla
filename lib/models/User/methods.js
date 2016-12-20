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
    "User--changeEmail": function(userId, newEmail) {
        check(userId, String);
        check(newEmail, String);
        check(this.userId, String);
        if (Roles.userIsInRole(this.userId, 'manager')) {
            Meteor.users.update(userId, {$set: {"emails.0.address": newEmail}})
        }
    },
    "User--changeCommissionFee": function(userId, commissionFee) {
        check(userId, String);
        check(this.userId, String);

        if (Roles.userIsInRole(this.userId, 'manager') && Number(commissionFee) == commissionFee) {
            Meteor.users.update(userId, {$set: {"commissionFee": commissionFee}})
        }
    },
    "Users--createNewUser": function(email) {
        check(email, String);
        if(Meteor.isServer){
            if (Roles.userIsInRole(this.userId, 'manager'))
                return Accounts.createUser({email: email})
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
    },
    'User--newLocation': function(userId) {
        check(userId, String);
        if (this.userId === userId || Roles.userIsInRole(this.userId, 'manager')) {
            Meteor.users.update(userId, {$addToSet: {'profile.locations': {_id: Random.id()}}})
        }
    },
    'User--removeLocation': function(userId, locationId) {
        check(userId, String);
        check(locationId, String);
        check(this.userId, String);
        if (this.userId === userId || Roles.userIsInRole(this.userId, 'manager')) {
            Meteor.users.update(userId, {$pull: {'profile.locations': {'_id': locationId}}})
        }
    },
    'User--updateLocation': function(userId, locationId, field, value) {
        check(this.userId, String);
        check(userId, String);
        check(locationId, String);
        check(field, String);
        check(value, String);
        check(this.userId, String);

        if (this.userId === userId || Roles.userIsInRole(this.userId, 'manager')) {
            Meteor.users.update({_id: userId, 'profile.locations._id': locationId}, {$set: {['profile.locations.$.'+field]: value}})
        }

    },
    'User--updateProfileImage': function(userId, path, filename) {
        check([userId, path, filename], [String])
        if (userId === this.userId || Roles.isManager(this.userId)) {
            Meteor.users.update(userId, {$set: {'profile.image': {path: path, filename: filename}}})
        }
    },
    'User--setLanguage': function(lang) {
        if (Meteor.isClient)
            localStorage.setItem('locale', lang)
        if (Meteor.isServer && this.userId)
            Meteor.users.update(this.userId, {$set: {locale: lang}})
    }
});
